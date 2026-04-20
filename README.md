# INTIMACY

## 基本情報
- LINE: https://lin.ee/wJ21xSXg
- ホットペッパー: https://beauty.hotpepper.jp/kr/slnH000785676/

## お知らせ管理（/admin）
複数スタッフ・複数端末で更新できるように、Supabase（Auth + DB）で「お知らせ」を管理できる画面を追加しています。

### 1) 環境変数
CRA（create-react-app）のため、`.env` に以下を設定してください。

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

` .env.example` を `.env` にコピーしてから値を入れるのがおすすめです（変更したら `npm start` を再起動すると確実に反映されます）。

### 2) テーブル作成（例）
SupabaseのSQL Editorで例として以下を作成してください（必要に応じて調整OK）。

```sql
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  date date not null,
  title text not null,
  content text not null,
  sort_order int not null default 0,
  image_url text,
  image_path text
);

alter table public.news enable row level security;

-- 公開側は誰でも閲覧OK
create policy "public can read news"
on public.news for select
to anon, authenticated
using (true);

-- 管理側はログインユーザーのみ変更OK（スタッフはAuthユーザーとして作成）
create policy "authenticated can write news"
on public.news for all
to authenticated
using (true)
with check (true);
```

### 3) スタッフアカウント
Supabase Dashboard の Authentication でスタッフ用ユーザーを作成し、`/admin` からログインしてください。

### 4) 画像（Storage）
「お知らせ」に画像を1枚つける場合、Supabase Storage に `news-images` バケットを作成してください。

- バケット: `news-images`
- 参照: 公開ページでも表示したいので「Public bucket」を推奨（もしくは anon に read を許可）

アップロードはログイン済み（authenticated）のみ許可する想定です。

```sql
-- Storage: news-images を authenticated のみ書き込み可（public読み取りはバケットをPublicにする想定）
create policy "authenticated can upload news images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'news-images');

create policy "authenticated can update news images"
on storage.objects for update
to authenticated
using (bucket_id = 'news-images')
with check (bucket_id = 'news-images');

create policy "authenticated can delete news images"
on storage.objects for delete
to authenticated
using (bucket_id = 'news-images');
```
