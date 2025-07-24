// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4969",
  "title": "Comparativo de delivery Salvador",
  "slug": "comparativo-de-delivery-salvador",
  "category": "food",
  "subcategory": "delivery",
  "description": "Descubra comparativo de delivery salvador com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Pizza Margherita",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Hambúrguer Artesanal",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "Sushi Tradicional",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Pasta Carbonara",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Tacos Mexicanos",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Churrasco Brasileiro",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Salada Caesar",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Risotto de Camarão",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "food",
    "delivery",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Comparativo de delivery Salvador - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta comparativo de delivery salvador online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "food",
    "delivery",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 8382,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Comparativo de delivery Salvador - Roleta Online Grátis',
  description: 'Use nossa roleta comparativo de delivery salvador online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'food, delivery, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/comparativo-de-delivery-salvador',
  openGraph: {
    title: 'Comparativo de delivery Salvador - Roleta Online Grátis',
    description: 'Use nossa roleta comparativo de delivery salvador online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/comparativo-de-delivery-salvador',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/comparativo-de-delivery-salvador',
        width: 1200,
        height: 630,
        alt: 'Comparativo de delivery Salvador - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparativo de delivery Salvador - Roleta Online Grátis',
    description: 'Use nossa roleta comparativo de delivery salvador online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/comparativo-de-delivery-salvador']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/comparativo-de-delivery-salvador'
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
  "name": "Comparativo de delivery Salvador - Roleta Online Grátis",
  "description": "Use nossa roleta comparativo de delivery salvador online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/comparativo-de-delivery-salvador",
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

export default function comparativodedeliverysalvadorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Comparativo de delivery Salvador - Roleta Online Grátis"
        seoDescription="Use nossa roleta comparativo de delivery salvador online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'comparativo-de-delivery-salvador' }];
}
