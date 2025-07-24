import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ClientProviders from '@/components/ClientProviders';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WheelWheel - Spin the Wheel | Roleta de Decisões Online",
  description: "Crie e gire roletas personalizadas para decisões aleatórias. Sistema completo com templates, categorias e compartilhamento. Gratuito e fácil de usar!",
  keywords: "roleta, decisão, sorteio, wheel, spin, roda da fortuna, decisões aleatórias, templates",
  authors: [{ name: "WheelWheel Team" }],
  creator: "WheelWheel",
  publisher: "WheelWheel",
  robots: "index, follow",
  openGraph: {
    title: "WheelWheel - Roleta de Decisões Online",
    description: "Crie roletas personalizadas para suas decisões. Mais de 20 templates disponíveis!",
    type: "website",
    locale: "pt_BR",
    siteName: "WheelWheel"
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelWheel - Roleta de Decisões",
    description: "Crie roletas personalizadas para suas decisões"
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3B82F6'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-sans`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
