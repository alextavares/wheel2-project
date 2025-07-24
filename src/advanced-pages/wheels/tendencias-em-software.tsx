// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4983",
  "title": "Tendências em software",
  "slug": "tendencias-em-software",
  "category": "technology",
  "subcategory": "software",
  "description": "Descubra tendências em software com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "software",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Tendências em software - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta tendências em software online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "technology",
    "software",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 7375,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Tendências em software - Roleta Online Grátis',
  description: 'Use nossa roleta tendências em software online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'technology, software, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/tendencias-em-software',
  openGraph: {
    title: 'Tendências em software - Roleta Online Grátis',
    description: 'Use nossa roleta tendências em software online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/tendencias-em-software',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/tendencias-em-software',
        width: 1200,
        height: 630,
        alt: 'Tendências em software - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tendências em software - Roleta Online Grátis',
    description: 'Use nossa roleta tendências em software online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/tendencias-em-software']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/tendencias-em-software'
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
  "name": "Tendências em software - Roleta Online Grátis",
  "description": "Use nossa roleta tendências em software online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/tendencias-em-software",
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

export default function tendenciasemsoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Tendências em software - Roleta Online Grátis"
        seoDescription="Use nossa roleta tendências em software online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'tendencias-em-software' }];
}
