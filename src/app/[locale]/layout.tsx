import { Locale } from '@/lib/i18n';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  return (
    <div data-locale={locale}>
      {children}
    </div>
  );
}