// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4986",
  "title": "Comparativo jogos-educativos esporte",
  "slug": "comparativo-jogos-educativos-esporte",
  "category": "games",
  "subcategory": "jogos-educativos",
  "description": "Descubra comparativo jogos-educativos esporte com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "jogos-educativos",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Comparativo jogos-educativos esporte - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta comparativo jogos-educativos esporte online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "games",
    "jogos-educativos",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 5297,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Comparativo jogos-educativos esporte - Roleta Online Grátis',
  description: 'Use nossa roleta comparativo jogos-educativos esporte online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'games, jogos-educativos, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/comparativo-jogos-educativos-esporte',
  openGraph: {
    title: 'Comparativo jogos-educativos esporte - Roleta Online Grátis',
    description: 'Use nossa roleta comparativo jogos-educativos esporte online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/comparativo-jogos-educativos-esporte',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/comparativo-jogos-educativos-esporte',
        width: 1200,
        height: 630,
        alt: 'Comparativo jogos-educativos esporte - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparativo jogos-educativos esporte - Roleta Online Grátis',
    description: 'Use nossa roleta comparativo jogos-educativos esporte online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/comparativo-jogos-educativos-esporte']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/comparativo-jogos-educativos-esporte'
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
  "name": "Comparativo jogos-educativos esporte - Roleta Online Grátis",
  "description": "Use nossa roleta comparativo jogos-educativos esporte online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/comparativo-jogos-educativos-esporte",
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

export default function comparativojogoseducativosesportePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Comparativo jogos-educativos esporte - Roleta Online Grátis"
        seoDescription="Use nossa roleta comparativo jogos-educativos esporte online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'comparativo-jogos-educativos-esporte' }];
}
