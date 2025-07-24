// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4996",
  "title": "O que fazer em aventura",
  "slug": "o-que-fazer-em-aventura",
  "category": "travel",
  "subcategory": "aventura",
  "description": "Descubra o que fazer em aventura com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Paris, França",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Tokyo, Japão",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "New York, EUA",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Rio de Janeiro, Brasil",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Londres, Inglaterra",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Roma, Itália",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Barcelona, Espanha",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Sydney, Austrália",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "travel",
    "aventura",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "O que fazer em aventura - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta o que fazer em aventura online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "travel",
    "aventura",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 388,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'O que fazer em aventura - Roleta Online Grátis',
  description: 'Use nossa roleta o que fazer em aventura online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'travel, aventura, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/o-que-fazer-em-aventura',
  openGraph: {
    title: 'O que fazer em aventura - Roleta Online Grátis',
    description: 'Use nossa roleta o que fazer em aventura online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/o-que-fazer-em-aventura',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/o-que-fazer-em-aventura',
        width: 1200,
        height: 630,
        alt: 'O que fazer em aventura - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O que fazer em aventura - Roleta Online Grátis',
    description: 'Use nossa roleta o que fazer em aventura online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/o-que-fazer-em-aventura']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/o-que-fazer-em-aventura'
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
  "name": "O que fazer em aventura - Roleta Online Grátis",
  "description": "Use nossa roleta o que fazer em aventura online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/o-que-fazer-em-aventura",
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

export default function oquefazeremaventuraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="O que fazer em aventura - Roleta Online Grátis"
        seoDescription="Use nossa roleta o que fazer em aventura online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'o-que-fazer-em-aventura' }];
}
