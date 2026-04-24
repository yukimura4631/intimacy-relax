export const metadata = {
  metadataBase: new URL('https://www.intimacy-relax.com/'),
  title: {
    default: 'INTIMACY｜新松戸の女性専用リラクゼーション（アロマリンパ・ヘッドスパ）',
    template: '%s｜INTIMACY',
  },
  description:
    '新松戸の女性専用リラクゼーションサロン INTIMACY。アロマリンパ・ヘッドスパなどの施術メニュー、アクセス、予約方法をご案内します。',
  alternates: { canonical: 'https://www.intimacy-relax.com/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'INTIMACY',
    url: 'https://www.intimacy-relax.com/',
    title: 'INTIMACY｜新松戸の女性専用リラクゼーション（アロマリンパ・ヘッドスパ）',
    description:
      '新松戸の女性専用リラクゼーションサロン INTIMACY。アロマリンパ・ヘッドスパなどの施術メニュー、アクセス、予約方法をご案内します。',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: 'INTIMACY' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTIMACY｜新松戸の女性専用リラクゼーション（アロマリンパ・ヘッドスパ）',
    description:
      '新松戸の女性専用リラクゼーションサロン INTIMACY。アロマリンパ・ヘッドスパなどの施術メニュー、アクセス、予約方法をご案内します。',
    images: ['/images/ogp.png'],
  },
};

export const viewport = {
  themeColor: '#6b4c9a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/tailwind.min.css" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
