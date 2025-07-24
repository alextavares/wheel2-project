// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4975",
  "title": "Futuro do ia",
  "slug": "futuro-do-ia",
  "category": "technology",
  "subcategory": "ia",
  "description": "Descubra futuro do ia com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "iPhone 15",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Samsung Galaxy",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "MacBook Pro",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Dell XPS",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "ChatGPT",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Google Bard",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Microsoft Copilot",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Adobe Creative",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "technology",
    "ia",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Futuro do ia - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta futuro do ia online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "technology",
    "ia",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 5762,
  "isPopular": true,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Futuro do ia - Roleta Online Grátis',
  description: 'Use nossa roleta futuro do ia online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'technology, ia, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/futuro-do-ia',
  openGraph: {
    title: 'Futuro do ia - Roleta Online Grátis',
    description: 'Use nossa roleta futuro do ia online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/futuro-do-ia',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/futuro-do-ia',
        width: 1200,
        height: 630,
        alt: 'Futuro do ia - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Futuro do ia - Roleta Online Grátis',
    description: 'Use nossa roleta futuro do ia online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/futuro-do-ia']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/futuro-do-ia'
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
  "name": "Futuro do ia - Roleta Online Grátis",
  "description": "Use nossa roleta futuro do ia online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/futuro-do-ia",
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

export default function futurodoiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Futuro do ia - Roleta Online Grátis"
        seoDescription="Use nossa roleta futuro do ia online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'futuro-do-ia' }];
}
