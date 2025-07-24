// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4988",
  "title": "Experiências únicas em turismo-cultural",
  "slug": "experiencias-unicas-em-turismo-cultural",
  "category": "travel",
  "subcategory": "turismo-cultural",
  "description": "Descubra experiências únicas em turismo-cultural com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "turismo-cultural",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Experiências únicas em turismo-cultural - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta experiências únicas em turismo-cultural online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "travel",
    "turismo-cultural",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 576,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Experiências únicas em turismo-cultural - Roleta Online Grátis',
  description: 'Use nossa roleta experiências únicas em turismo-cultural online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'travel, turismo-cultural, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/experiencias-unicas-em-turismo-cultural',
  openGraph: {
    title: 'Experiências únicas em turismo-cultural - Roleta Online Grátis',
    description: 'Use nossa roleta experiências únicas em turismo-cultural online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/experiencias-unicas-em-turismo-cultural',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/experiencias-unicas-em-turismo-cultural',
        width: 1200,
        height: 630,
        alt: 'Experiências únicas em turismo-cultural - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experiências únicas em turismo-cultural - Roleta Online Grátis',
    description: 'Use nossa roleta experiências únicas em turismo-cultural online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/experiencias-unicas-em-turismo-cultural']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/experiencias-unicas-em-turismo-cultural'
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
  "name": "Experiências únicas em turismo-cultural - Roleta Online Grátis",
  "description": "Use nossa roleta experiências únicas em turismo-cultural online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/experiencias-unicas-em-turismo-cultural",
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

export default function experienciasunicasemturismoculturalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Experiências únicas em turismo-cultural - Roleta Online Grátis"
        seoDescription="Use nossa roleta experiências únicas em turismo-cultural online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'experiencias-unicas-em-turismo-cultural' }];
}
