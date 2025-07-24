// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4977",
  "title": "Descobrindo dietas em no Brasil",
  "slug": "descobrindo-dietas-em-no-brasil",
  "category": "food",
  "subcategory": "dietas",
  "description": "Descubra descobrindo dietas em no brasil com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "dietas",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Descobrindo dietas em no Brasil - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta descobrindo dietas em no brasil online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "food",
    "dietas",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 9989,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Descobrindo dietas em no Brasil - Roleta Online Grátis',
  description: 'Use nossa roleta descobrindo dietas em no brasil online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'food, dietas, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/descobrindo-dietas-em-no-brasil',
  openGraph: {
    title: 'Descobrindo dietas em no Brasil - Roleta Online Grátis',
    description: 'Use nossa roleta descobrindo dietas em no brasil online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/descobrindo-dietas-em-no-brasil',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/descobrindo-dietas-em-no-brasil',
        width: 1200,
        height: 630,
        alt: 'Descobrindo dietas em no Brasil - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Descobrindo dietas em no Brasil - Roleta Online Grátis',
    description: 'Use nossa roleta descobrindo dietas em no brasil online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/descobrindo-dietas-em-no-brasil']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/descobrindo-dietas-em-no-brasil'
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
  "name": "Descobrindo dietas em no Brasil - Roleta Online Grátis",
  "description": "Use nossa roleta descobrindo dietas em no brasil online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/descobrindo-dietas-em-no-brasil",
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

export default function descobrindodietasemnobrasilPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Descobrindo dietas em no Brasil - Roleta Online Grátis"
        seoDescription="Use nossa roleta descobrindo dietas em no brasil online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'descobrindo-dietas-em-no-brasil' }];
}
