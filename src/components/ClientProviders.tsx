'use client';

import { HelmetProvider } from 'react-helmet-async';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  );
}