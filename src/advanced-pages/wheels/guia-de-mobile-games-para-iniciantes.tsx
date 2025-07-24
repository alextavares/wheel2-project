// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4994",
  "title": "Guia de mobile-games para iniciantes",
  "slug": "guia-de-mobile-games-para-iniciantes",
  "category": "games",
  "subcategory": "mobile-games",
  "description": "Descubra guia de mobile-games para iniciantes com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "The Legend of Zelda",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Super Mario Bros",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "Minecraft",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Fortnite",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Among Us",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Call of Duty",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "FIFA 2024",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Pokémon",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "games",
    "mobile-games",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Guia de mobile-games para iniciantes - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta guia de mobile-games para iniciantes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "games",
    "mobile-games",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 9680,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Guia de mobile-games para iniciantes - Roleta Online Grátis',
  description: 'Use nossa roleta guia de mobile-games para iniciantes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'games, mobile-games, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/guia-de-mobile-games-para-iniciantes',
  openGraph: {
    title: 'Guia de mobile-games para iniciantes - Roleta Online Grátis',
    description: 'Use nossa roleta guia de mobile-games para iniciantes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/guia-de-mobile-games-para-iniciantes',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/guia-de-mobile-games-para-iniciantes',
        width: 1200,
        height: 630,
        alt: 'Guia de mobile-games para iniciantes - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia de mobile-games para iniciantes - Roleta Online Grátis',
    description: 'Use nossa roleta guia de mobile-games para iniciantes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/guia-de-mobile-games-para-iniciantes']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/guia-de-mobile-games-para-iniciantes'
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3B82F6'
  }
}

// Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Guia de mobile-games para iniciantes - Roleta Online Grátis",
  "description": "Use nossa roleta guia de mobile-games para iniciantes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/guia-de-mobile-games-para-iniciantes",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "Wheel Maker",
    "url": "https://wheelmaker.app"
  }
};

export default function guiademobilegamesparainiciantesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Guia de mobile-games para iniciantes - Roleta Online Grátis"
        seoDescription="Use nossa roleta guia de mobile-games para iniciantes online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'guia-de-mobile-games-para-iniciantes' }];
}
