// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4998",
  "title": "Mitos sobre meditacao",
  "slug": "mitos-sobre-meditacao",
  "category": "health",
  "subcategory": "meditacao",
  "description": "Descubra mitos sobre meditacao com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Corrida Matinal",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Yoga Relaxante",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "Meditação",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Musculação",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Natação",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Pilates",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Crossfit",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Caminhada",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "health",
    "meditacao",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Mitos sobre meditacao - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta mitos sobre meditacao online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "health",
    "meditacao",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 3471,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Mitos sobre meditacao - Roleta Online Grátis',
  description: 'Use nossa roleta mitos sobre meditacao online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'health, meditacao, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/mitos-sobre-meditacao',
  openGraph: {
    title: 'Mitos sobre meditacao - Roleta Online Grátis',
    description: 'Use nossa roleta mitos sobre meditacao online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/mitos-sobre-meditacao',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/mitos-sobre-meditacao',
        width: 1200,
        height: 630,
        alt: 'Mitos sobre meditacao - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mitos sobre meditacao - Roleta Online Grátis',
    description: 'Use nossa roleta mitos sobre meditacao online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/mitos-sobre-meditacao']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/mitos-sobre-meditacao'
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
  "name": "Mitos sobre meditacao - Roleta Online Grátis",
  "description": "Use nossa roleta mitos sobre meditacao online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/mitos-sobre-meditacao",
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

export default function mitossobremeditacaoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Mitos sobre meditacao - Roleta Online Grátis"
        seoDescription="Use nossa roleta mitos sobre meditacao online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'mitos-sobre-meditacao' }];
}
