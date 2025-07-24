// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4991",
  "title": "Melhores smartphones de este ano",
  "slug": "melhores-smartphones-de-este-ano",
  "category": "technology",
  "subcategory": "smartphones",
  "description": "Descubra melhores smartphones de este ano com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
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
    "smartphones",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Melhores smartphones de este ano - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta melhores smartphones de este ano online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "technology",
    "smartphones",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 7962,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Melhores smartphones de este ano - Roleta Online Grátis',
  description: 'Use nossa roleta melhores smartphones de este ano online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'technology, smartphones, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/melhores-smartphones-de-este-ano',
  openGraph: {
    title: 'Melhores smartphones de este ano - Roleta Online Grátis',
    description: 'Use nossa roleta melhores smartphones de este ano online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/melhores-smartphones-de-este-ano',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/melhores-smartphones-de-este-ano',
        width: 1200,
        height: 630,
        alt: 'Melhores smartphones de este ano - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melhores smartphones de este ano - Roleta Online Grátis',
    description: 'Use nossa roleta melhores smartphones de este ano online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/melhores-smartphones-de-este-ano']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/melhores-smartphones-de-este-ano'
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
  "name": "Melhores smartphones de este ano - Roleta Online Grátis",
  "description": "Use nossa roleta melhores smartphones de este ano online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/melhores-smartphones-de-este-ano",
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

export default function melhoressmartphonesdeesteanoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Melhores smartphones de este ano - Roleta Online Grátis"
        seoDescription="Use nossa roleta melhores smartphones de este ano online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'melhores-smartphones-de-este-ano' }];
}
