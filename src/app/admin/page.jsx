import AdminNews from '../../AdminNews';

export const dynamic = 'force-static';

export const metadata = {
  title: '管理画面（お知らせ）',
  description: 'INTIMACY のお知らせ投稿・編集用の管理画面です。',
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminPage() {
  return <AdminNews />;
}

