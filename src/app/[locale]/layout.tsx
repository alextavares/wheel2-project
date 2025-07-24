import { Locale } from '@/lib/i18n';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}