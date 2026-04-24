'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase, supabaseConfigWarning } from './supabaseClient';

const pageStyles = {
  minHeight: '100vh',
  padding: '96px 16px 48px',
  backgroundColor: '#faf7ff',
  fontFamily: "'Noto Sans JP', sans-serif",
};

const cardStyles = {
  maxWidth: 980,
  margin: '0 auto',
  backgroundColor: 'white',
  borderRadius: 12,
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  padding: 20,
};

const inputStyles = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  fontSize: 14,
  outline: 'none',
};

const buttonStyles = {
  padding: '10px 14px',
  borderRadius: 9999,
  border: 'none',
  cursor: 'pointer',
  fontSize: 13,
};

function humanizeDbError(message) {
  const text = String(message ?? '');
  if (!text) return '不明なエラーが発生しました。';
  if (text.includes('row-level security')) {
    return '権限エラーです（RLS）。Supabaseの `news` テーブルで、authenticated に INSERT/UPDATE/DELETE を許可するポリシーを追加してください（READMEのSQL例を参照）。';
  }
  return text;
}

const NEWS_IMAGES_BUCKET = 'news-images';

function sanitizeFilename(value) {
  return String(value ?? 'image')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function uploadNewsImage(file) {
  if (!file) return { image_url: null, image_path: null };
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const base = sanitizeFilename(file.name.replace(/\.[^/.]+$/, '')) || 'image';
  const id = window.crypto?.randomUUID?.() ?? String(Date.now());
  const path = `${id}_${base}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(NEWS_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(NEWS_IMAGES_BUCKET).getPublicUrl(path);
  return { image_url: data?.publicUrl ?? null, image_path: path };
}

async function removeNewsImage(path) {
  if (!path) return;
  await supabase.storage.from(NEWS_IMAGES_BUCKET).remove([path]);
}

function toSortableInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatDateInput(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.slice(0, 10);
  return '';
}

export default function AdminNews() {
  const [isMobile, setIsMobile] = useState(false);
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState('');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [creating, setCreating] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ date: '', title: '', content: '' });
  const [editImageFile, setEditImageFile] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [movingId, setMovingId] = useState(null);

  const signedInEmail = session?.user?.email ?? '';

  const isReady = useMemo(() => isSupabaseConfigured && supabase, []);
  const formTwoCols = isMobile ? '1fr' : '170px 1fr';

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    if (typeof media.addEventListener === 'function') media.addEventListener('change', onChange);
    else media.addListener(onChange);
    return () => {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', onChange);
      else media.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      setCheckingSession(false);
      return;
    }

    let unsub = null;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session ?? null);
      })
      .finally(() => setCheckingSession(false));

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });
    unsub = data?.subscription;

    return () => {
      unsub?.unsubscribe?.();
    };
  }, [isReady]);

  const fetchItems = async () => {
    if (!isReady) return;
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase
      .from('news')
      .select('id,date,title,content,sort_order,created_at,image_url,image_path')
      .order('sort_order', { ascending: true, nullsFirst: true })
      .order('date', { ascending: false });

    if (fetchError) {
      setError(humanizeDbError(fetchError.message));
      setLoading(false);
      return;
    }
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    if (!isReady) return;
    if (!session) return;
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, session?.user?.id]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!isReady) return;
    setAuthBusy(true);
    setAuthError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setAuthError(signInError.message);
    setAuthBusy(false);
  };

  const authHelp =
    authError && authError.toLowerCase().includes('invalid login credentials')
      ? 'Supabase側にそのメールのユーザーが存在しない/パスワード違いの可能性が高いです。Supabase Dashboard → Authentication → Users でスタッフユーザーを作成し、パスワードを設定（必要なら Email Confirmed をON）してから再度ログインしてください。'
      : '';

  const handleSignOut = async () => {
    if (!isReady) return;
    await supabase.auth.signOut();
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!isReady) return;
    if (!newDate || !newTitle.trim() || !newContent.trim()) return;

    setCreating(true);
    setError('');

    const currentMin = items.reduce((min, item, idx) => {
      const candidate = toSortableInt(item.sort_order, idx * 10);
      return Math.min(min, candidate);
    }, 0);
    const sortOrder = currentMin - 10;

    let imagePayload = { image_url: null, image_path: null };
    try {
      if (newImageFile) imagePayload = await uploadNewsImage(newImageFile);
    } catch (uploadError) {
      setError(humanizeDbError(uploadError?.message ?? String(uploadError)));
      setCreating(false);
      return;
    }

    const { error: insertError } = await supabase.from('news').insert([
      {
        date: newDate,
        title: newTitle.trim(),
        content: newContent.trim(),
        sort_order: sortOrder,
        ...imagePayload,
      },
    ]);

    if (insertError) {
      setError(humanizeDbError(insertError.message));
      await removeNewsImage(imagePayload.image_path);
      setCreating(false);
      return;
    }

    setNewDate('');
    setNewTitle('');
    setNewContent('');
    setNewImageFile(null);
    setCreating(false);
    fetchItems();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditDraft({
      date: formatDateInput(item.date),
      title: item.title ?? '',
      content: item.content ?? '',
    });
    setEditImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ date: '', title: '', content: '' });
    setEditImageFile(null);
  };

  const saveEdit = async () => {
    if (!isReady) return;
    if (!editingId) return;
    if (!editDraft.date || !editDraft.title.trim() || !editDraft.content.trim()) return;

    setSavingEdit(true);
    setError('');

    const current = items.find((it) => it.id === editingId);
    let imagePayload = {};
    let newUploadedPath = null;
    try {
      if (editImageFile) {
        const uploaded = await uploadNewsImage(editImageFile);
        imagePayload = uploaded;
        newUploadedPath = uploaded.image_path;
      }
    } catch (uploadError) {
      setError(humanizeDbError(uploadError?.message ?? String(uploadError)));
      setSavingEdit(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('news')
      .update({
        date: editDraft.date,
        title: editDraft.title.trim(),
        content: editDraft.content.trim(),
        ...imagePayload,
      })
      .eq('id', editingId);

    if (updateError) {
      setError(humanizeDbError(updateError.message));
      await removeNewsImage(newUploadedPath);
      setSavingEdit(false);
      return;
    }
    if (editImageFile && current?.image_path && current.image_path !== newUploadedPath) {
      await removeNewsImage(current.image_path);
    }
    setSavingEdit(false);
    cancelEdit();
    fetchItems();
  };

  const removeImageFromItem = async (id) => {
    if (!isReady) return;
    const current = items.find((it) => it.id === id);
    if (!current) return;
    if (!current.image_url && !current.image_path) return;
    if (!window.confirm('このお知らせの画像を削除しますか？')) return;

    setError('');
    const { error: updateError } = await supabase
      .from('news')
      .update({ image_url: null, image_path: null })
      .eq('id', id);
    if (updateError) {
      setError(humanizeDbError(updateError.message));
      return;
    }
    await removeNewsImage(current.image_path);
    fetchItems();
  };

  const removeItem = async (id) => {
    if (!isReady) return;
    if (!window.confirm('このお知らせを削除しますか？')) return;
    setError('');
    const current = items.find((it) => it.id === id);
    const { error: deleteError } = await supabase.from('news').delete().eq('id', id);
    if (deleteError) {
      setError(humanizeDbError(deleteError.message));
      return;
    }
    await removeNewsImage(current?.image_path);
    fetchItems();
  };

  const moveItem = async (id, direction) => {
    if (!isReady) return;
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) return;
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= items.length) return;

    const a = items[index];
    const b = items[swapWith];
    const aOrder = toSortableInt(a.sort_order, index * 10);
    const bOrder = toSortableInt(b.sort_order, swapWith * 10);

    setMovingId(id);
    setError('');
    const [ra, rb] = await Promise.all([
      supabase.from('news').update({ sort_order: bOrder }).eq('id', a.id),
      supabase.from('news').update({ sort_order: aOrder }).eq('id', b.id),
    ]);

    const moveError = ra.error ?? rb.error;
    if (moveError) {
      setError(humanizeDbError(moveError.message));
      setMovingId(null);
      return;
    }
    setMovingId(null);
    fetchItems();
  };

  if (!isSupabaseConfigured) {
    return (
      <div style={pageStyles}>
        <div style={cardStyles}>
          <h1 style={{ fontSize: 22, margin: 0, color: '#4c1d95' }}>お知らせ管理</h1>
          <p style={{ marginTop: 12, color: '#4b5563', fontSize: 14, lineHeight: 1.7 }}>
            Supabaseの環境変数が未設定です。`NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定してください。
          </p>
          <p style={{ marginTop: 8, color: '#6b7280', fontSize: 13 }}>
            いったん公開ページへ戻る場合は <a href="/">/</a>
          </p>
        </div>
      </div>
    );
  }

  if (checkingSession) {
    return (
      <div style={pageStyles}>
        <div style={cardStyles}>
          <p style={{ margin: 0, color: '#4b5563' }}>読み込み中…</p>
        </div>
      </div>
    );
  }

  // optional: allow /admin?redirect=1 pattern later
  const canRender = Boolean(supabase);
  if (!canRender) return null;

  if (!session) {
    return (
      <div style={pageStyles}>
        <div style={cardStyles}>
          <h1 style={{ fontSize: 22, margin: 0, color: '#4c1d95' }}>お知らせ管理（ログイン）</h1>
          <p style={{ marginTop: 10, color: '#6b7280', fontSize: 13 }}>
            スタッフ用アカウントでログインしてください。
          </p>
          {supabaseConfigWarning ? (
            <p style={{ marginTop: 10, marginBottom: 0, color: '#b91c1c', fontSize: 13, lineHeight: 1.6 }}>
              {supabaseConfigWarning}
            </p>
          ) : null}
          <form onSubmit={handleSignIn} style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>メール</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="staff@example.com"
                style={inputStyles}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>パスワード</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={inputStyles}
                autoComplete="current-password"
                required
              />
            </div>
            {authError ? (
              <div style={{ display: 'grid', gap: 8 }}>
                <p style={{ margin: 0, color: '#b91c1c', fontSize: 13, lineHeight: 1.6 }}>{authError}</p>
                {authHelp ? (
                  <p style={{ margin: 0, color: '#6b7280', fontSize: 13, lineHeight: 1.6 }}>{authHelp}</p>
                ) : null}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={authBusy}
              style={{
                ...buttonStyles,
                backgroundColor: '#6b21a8',
                color: 'white',
                opacity: authBusy ? 0.7 : 1,
                justifySelf: 'start',
              }}
            >
              {authBusy ? 'ログイン中…' : 'ログイン'}
            </button>
          </form>
          <p style={{ marginTop: 16, color: '#6b7280', fontSize: 13 }}>
            公開ページへ戻る: <a href="/">/</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 22, margin: 0, color: '#4c1d95' }}>お知らせ管理</h1>
            <p style={{ marginTop: 6, marginBottom: 0, fontSize: 12, color: '#6b7280' }}>
              ログイン中: {signedInEmail}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="/" style={{ fontSize: 13, color: '#6b21a8', textDecoration: 'none' }}>
              公開ページへ
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              style={{ ...buttonStyles, backgroundColor: '#ede9fe', color: '#4c1d95' }}
            >
              ログアウト
            </button>
          </div>
        </div>

        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid #f3f4f6' }}>
          <h2 style={{ fontSize: 16, margin: 0, color: '#4b5563' }}>追加</h2>
          <form onSubmit={handleCreate} style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: formTwoCols, gap: 10 }}>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={inputStyles}
                required
              />
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="タイトル"
                style={inputStyles}
                required
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImageFile(e.target.files?.[0] ?? null)}
              style={inputStyles}
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="本文"
              style={{ ...inputStyles, minHeight: 90, resize: 'vertical' }}
              required
            />
            <button
              type="submit"
              disabled={creating}
              style={{
                ...buttonStyles,
                backgroundColor: '#6b21a8',
                color: 'white',
                opacity: creating ? 0.7 : 1,
                justifySelf: 'start',
              }}
            >
              {creating ? '追加中…' : '追加'}
            </button>
          </form>
        </div>

        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <h2 style={{ fontSize: 16, margin: 0, color: '#4b5563' }}>一覧</h2>
            <button
              type="button"
              onClick={fetchItems}
              disabled={loading}
              style={{ ...buttonStyles, backgroundColor: '#f5f3ff', color: '#4c1d95', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '更新中…' : '再読み込み'}
            </button>
          </div>

          {error ? (
            <p style={{ marginTop: 12, marginBottom: 0, color: '#b91c1c', fontSize: 13, lineHeight: 1.6 }}>
              {error}
            </p>
          ) : null}

          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {items.length === 0 && !loading ? (
              <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>お知らせがまだありません。</p>
            ) : null}
            {items.map((item, index) => {
              const isEditing = editingId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #f3f4f6',
                    borderRadius: 12,
                    padding: 14,
                    backgroundColor: 'white',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {isEditing ? (
                        <div style={{ display: 'grid', gap: 8 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: formTwoCols, gap: 10 }}>
                            <input
                              type="date"
                              value={editDraft.date}
                              onChange={(e) => setEditDraft((d) => ({ ...d, date: e.target.value }))}
                              style={inputStyles}
                              required
                            />
                            <input
                              value={editDraft.title}
                              onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                              style={inputStyles}
                              required
                            />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditImageFile(e.target.files?.[0] ?? null)}
                            style={inputStyles}
                          />
                          <textarea
                            value={editDraft.content}
                            onChange={(e) => setEditDraft((d) => ({ ...d, content: e.target.value }))}
                            style={{ ...inputStyles, minHeight: 90, resize: 'vertical' }}
                            required
                          />
                        </div>
                      ) : (
                        <>
                          <p style={{ margin: 0, color: '#6b21a8', fontSize: 12 }}>{formatDateInput(item.date)}</p>
                          <p style={{ margin: '6px 0 0', color: '#4c1d95', fontSize: 15, fontWeight: 600 }}>
                            {item.title}
                          </p>
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt=""
                              style={{
                                width: '100%',
                                maxWidth: 420,
                                height: 'auto',
                                borderRadius: 10,
                                marginTop: 10,
                                border: '1px solid #f3f4f6',
                              }}
                              loading="lazy"
                            />
                          ) : null}
                          <p style={{ margin: '6px 0 0', color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                            {item.content}
                          </p>
                        </>
                      )}
                    </div>

                    <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 'up')}
                          disabled={movingId === item.id || index === 0}
                          style={{
                            ...buttonStyles,
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            opacity: movingId === item.id || index === 0 ? 0.5 : 1,
                          }}
                        >
                          上へ
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 'down')}
                          disabled={movingId === item.id || index === items.length - 1}
                          style={{
                            ...buttonStyles,
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            opacity: movingId === item.id || index === items.length - 1 ? 0.5 : 1,
                          }}
                        >
                          下へ
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={saveEdit}
                              disabled={savingEdit}
                              style={{
                                ...buttonStyles,
                                backgroundColor: '#6b21a8',
                                color: 'white',
                                opacity: savingEdit ? 0.7 : 1,
                              }}
                            >
                              {savingEdit ? '保存中…' : '保存'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={savingEdit}
                              style={{ ...buttonStyles, backgroundColor: '#ede9fe', color: '#4c1d95' }}
                            >
                              キャンセル
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => startEdit(item)}
                              style={{ ...buttonStyles, backgroundColor: '#ede9fe', color: '#4c1d95' }}
                            >
                              編集
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImageFromItem(item.id)}
                              disabled={!item.image_url && !item.image_path}
                              style={{
                                ...buttonStyles,
                                backgroundColor: '#f3f4f6',
                                color: '#374151',
                                opacity: !item.image_url && !item.image_path ? 0.5 : 1,
                              }}
                            >
                              画像削除
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              style={{ ...buttonStyles, backgroundColor: '#fee2e2', color: '#991b1b' }}
                            >
                              削除
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
