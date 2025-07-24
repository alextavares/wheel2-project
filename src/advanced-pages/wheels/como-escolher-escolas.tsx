// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4963",
  "title": "Como escolher escolas",
  "slug": "como-escolher-escolas",
  "category": "education",
  "subcategory": "escolas",
  "description": "Descubra como escolher escolas com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Curso de Python",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Inglês Avançado",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "Matemática Básica",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "História do Brasil",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Física Quântica",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Literatura Clássica",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Química Orgânica",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Geografia Mundial",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "education",
    "escolas",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Como escolher escolas - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta como escolher escolas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "education",
    "escolas",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 6280,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Como escolher escolas - Roleta Online Grátis',
  description: 'Use nossa roleta como escolher escolas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'education, escolas, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/como-escolher-escolas',
  openGraph: {
    title: 'Como escolher escolas - Roleta Online Grátis',
    description: 'Use nossa roleta como escolher escolas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/como-escolher-escolas',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/como-escolher-escolas',
        width: 1200,
        height: 630,
        alt: 'Como escolher escolas - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Como escolher escolas - Roleta Online Grátis',
    description: 'Use nossa roleta como escolher escolas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/como-escolher-escolas']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/como-escolher-escolas'
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
  "name": "Como escolher escolas - Roleta Online Grátis",
  "description": "Use nossa roleta como escolher escolas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/como-escolher-escolas",
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

export default function comoescolherescolasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Como escolher escolas - Roleta Online Grátis"
        seoDescription="Use nossa roleta como escolher escolas online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'como-escolher-escolas' }];
}
