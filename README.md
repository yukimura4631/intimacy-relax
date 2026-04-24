# INTIMACY（公式サイト）

リラクゼーションサロン「INTIMACY」の公式サイト（LP）＋「お知らせ」管理（Supabase）用のソースコードです。

## 公式リンク
- LINE（予約・問い合わせ）: https://lin.ee/wJ21xSXg
- Hot Pepper Beauty: https://beauty.hotpepper.jp/kr/slnH000785676/

## 主な機能（本番公開向け）
- スマホ対応の1ページ構成（画像スライダー／メニュー表示など）
- 「お知らせ」一覧の表示（Supabase DB から取得）
- `/admin` 管理画面（Supabase Auth）
- お知らせ画像のアップロード（Supabase Storage）
- Vercel でのデプロイ想定（SPA リライト設定あり）

## 技術スタック
- Next.js（App Router / SSG）
- Supabase（Auth / Database / Storage）
- Tailwind CSS（スタイル）

## ローカル開発
### 1) 環境変数
`.env.example` を `.env` にコピーして値を設定します。

- `NEXT_PUBLIC_SUPABASE_URL`（Next.js）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`（Next.js）

### 2) 起動
```bash
npm install
npm run dev
```

## Supabase セットアップ（お知らせ）
### 1) テーブル作成 + RLS
Supabase の SQL Editor で実行します。

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

-- 公開側: 読み取りOK
create policy "public can read news"
on public.news for select
to anon, authenticated
using (true);

-- 管理側: 書き込みOK（ログインユーザーのみ）
create policy "authenticated can write news"
on public.news for all
to authenticated
using (true)
with check (true);
```

### 2) 管理ユーザー作成
Supabase Dashboard → Authentication でユーザーを作成し、`/admin` からログインします。

### 3) Storage（お知らせ画像）
Supabase Storage に `news-images` バケットを作成します。

- バケット名: `news-images`
- 公開設定: 公開側で画像を表示するため、基本は Public bucket を推奨（非公開で運用する場合は署名付きURL運用に変更）

RLS（Storage policies）が有効な場合は、少なくとも `authenticated` がアップロードできるようにします。

```sql
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

## 本番デプロイ（Vercel）
### 1) ビルド
```bash
npm run build
```

### 2) 環境変数（Vercel Project Settings）
- `NEXT_PUBLIC_SUPABASE_URL`（Next.js）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`（Next.js）

### 3) ルーティング
このリポジトリは SPA（Create React App）です。`vercel.json` にリライト設定があります。

### 4) よくあるハマり（本番で `.env` が読まれない）
Create React App の環境変数は「サーバー実行時に読む」のではなく、**ビルド時に静的に埋め込まれます**。
そのため本番（Vercel）ではリポジトリ内の `.env` は使われず、Vercel の環境変数を設定した上で **再デプロイ** が必要です。

## SEO（検索に強い公開のためのチェックリスト）
README は「運用の手順書」として、下記を満たす前提で本番公開するのがおすすめです。

- `public/index.html` の `<title>` と `<meta name="description">` を「店名 + 提供メニュー + エリア」が伝わる自然な日本語にする
- OGP（`og:title` / `og:description` / `og:image` / `og:url`）と Twitter Card を追加
- `robots.txt` と `sitemap.xml` を用意し、Google Search Console に登録する
- 画像の `alt` を自然な日本語で記述（施術内容・店名が伝わる文に）
- Core Web Vitals 対策（画像最適化、フォント最適化、不要な読み込み削減）

### 推奨メタタグ例（コピペ用）
※ 実際の「提供メニュー名」「エリア名」「サイトURL」に合わせて調整してください。

```html
<title>INTIMACY｜アロマリンパ・ヘッドスパ｜エリア名</title>
<meta name="description" content="INTIMACY（エリア名）のリラクゼーションサロン。アロマリンパ・ヘッドスパなどの施術メニュー、アクセス、予約方法をご案内します。" />
<link rel="canonical" href="https://example.com/" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="INTIMACY" />
<meta property="og:title" content="INTIMACY｜アロマリンパ・ヘッドスパ｜エリア名" />
<meta property="og:description" content="INTIMACY（エリア名）のリラクゼーションサロン。施術メニュー・アクセス・予約方法はこちら。" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:image" content="https://example.com/ogp.jpg" />

<meta name="twitter:card" content="summary_large_image" />
```

### SPA のSEOについて
本サイトは SPA（Create React App）です。SEO をさらに強化したい場合は、SSR/SSG（例: Next.js）やプリレンダリング導入も検討してください。

## 注意（セキュリティ）
- `.env` はコミットしない（公開リポジトリの場合は特に注意）
- Supabase の RLS は必ず有効化し、`/admin` 側の操作は `authenticated` のみに制限する

