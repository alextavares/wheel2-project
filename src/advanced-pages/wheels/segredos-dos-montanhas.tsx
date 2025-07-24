// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4980",
  "title": "Segredos dos montanhas",
  "slug": "segredos-dos-montanhas",
  "category": "travel",
  "subcategory": "montanhas",
  "description": "Descubra segredos dos montanhas com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "montanhas",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Segredos dos montanhas - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta segredos dos montanhas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "travel",
    "montanhas",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 7172,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Segredos dos montanhas - Roleta Online Grátis',
  description: 'Use nossa roleta segredos dos montanhas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'travel, montanhas, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/segredos-dos-montanhas',
  openGraph: {
    title: 'Segredos dos montanhas - Roleta Online Grátis',
    description: 'Use nossa roleta segredos dos montanhas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/segredos-dos-montanhas',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/segredos-dos-montanhas',
        width: 1200,
        height: 630,
        alt: 'Segredos dos montanhas - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Segredos dos montanhas - Roleta Online Grátis',
    description: 'Use nossa roleta segredos dos montanhas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/segredos-dos-montanhas']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/segredos-dos-montanhas'
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
  "name": "Segredos dos montanhas - Roleta Online Grátis",
  "description": "Use nossa roleta segredos dos montanhas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/segredos-dos-montanhas",
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

export default function segredosdosmontanhasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Segredos dos montanhas - Roleta Online Grátis"
        seoDescription="Use nossa roleta segredos dos montanhas online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'segredos-dos-montanhas' }];
}
