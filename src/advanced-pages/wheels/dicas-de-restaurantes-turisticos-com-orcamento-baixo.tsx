// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4964",
  "title": "Dicas de restaurantes-turisticos com orçamento baixo",
  "slug": "dicas-de-restaurantes-turisticos-com-orcamento-baixo",
  "category": "travel",
  "subcategory": "restaurantes-turisticos",
  "description": "Descubra dicas de restaurantes-turisticos com orçamento baixo com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "restaurantes-turisticos",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta dicas de restaurantes-turisticos com orçamento baixo online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "travel",
    "restaurantes-turisticos",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 9369,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis',
  description: 'Use nossa roleta dicas de restaurantes-turisticos com orçamento baixo online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'travel, restaurantes-turisticos, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/dicas-de-restaurantes-turisticos-com-orcamento-baixo',
  openGraph: {
    title: 'Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis',
    description: 'Use nossa roleta dicas de restaurantes-turisticos com orçamento baixo online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/dicas-de-restaurantes-turisticos-com-orcamento-baixo',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/dicas-de-restaurantes-turisticos-com-orcamento-baixo',
        width: 1200,
        height: 630,
        alt: 'Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis',
    description: 'Use nossa roleta dicas de restaurantes-turisticos com orçamento baixo online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/dicas-de-restaurantes-turisticos-com-orcamento-baixo']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/dicas-de-restaurantes-turisticos-com-orcamento-baixo'
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
  "name": "Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis",
  "description": "Use nossa roleta dicas de restaurantes-turisticos com orçamento baixo online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/dicas-de-restaurantes-turisticos-com-orcamento-baixo",
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

export default function dicasderestaurantesturisticoscomorcamentobaixoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Dicas de restaurantes-turisticos com orçamento baixo - Roleta Online Grátis"
        seoDescription="Use nossa roleta dicas de restaurantes-turisticos com orçamento baixo online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'dicas-de-restaurantes-turisticos-com-orcamento-baixo' }];
}
