// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4972",
  "title": "Guia de viagem para destinos-internacionais",
  "slug": "guia-de-viagem-para-destinos-internacionais",
  "category": "travel",
  "subcategory": "destinos-internacionais",
  "description": "Descubra guia de viagem para destinos-internacionais com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "destinos-internacionais",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Guia de viagem para destinos-internacionais - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta guia de viagem para destinos-internacionais online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "travel",
    "destinos-internacionais",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 284,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Guia de viagem para destinos-internacionais - Roleta Online Grátis',
  description: 'Use nossa roleta guia de viagem para destinos-internacionais online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'travel, destinos-internacionais, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/guia-de-viagem-para-destinos-internacionais',
  openGraph: {
    title: 'Guia de viagem para destinos-internacionais - Roleta Online Grátis',
    description: 'Use nossa roleta guia de viagem para destinos-internacionais online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/guia-de-viagem-para-destinos-internacionais',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/guia-de-viagem-para-destinos-internacionais',
        width: 1200,
        height: 630,
        alt: 'Guia de viagem para destinos-internacionais - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia de viagem para destinos-internacionais - Roleta Online Grátis',
    description: 'Use nossa roleta guia de viagem para destinos-internacionais online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/guia-de-viagem-para-destinos-internacionais']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/guia-de-viagem-para-destinos-internacionais'
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
  "name": "Guia de viagem para destinos-internacionais - Roleta Online Grátis",
  "description": "Use nossa roleta guia de viagem para destinos-internacionais online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/guia-de-viagem-para-destinos-internacionais",
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

export default function guiadeviagemparadestinosinternacionaisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Guia de viagem para destinos-internacionais - Roleta Online Grátis"
        seoDescription="Use nossa roleta guia de viagem para destinos-internacionais online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'guia-de-viagem-para-destinos-internacionais' }];
}
