// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4984",
  "title": "Clássicos do livros",
  "slug": "classicos-do-livros",
  "category": "entertainment",
  "subcategory": "livros",
  "description": "Descubra clássicos do livros com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Stranger Things",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Game of Thrones",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "The Office",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Friends",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Breaking Bad",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "The Crown",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Squid Game",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Wednesday",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "entertainment",
    "livros",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Clássicos do livros - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta clássicos do livros online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "entertainment",
    "livros",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 4218,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Clássicos do livros - Roleta Online Grátis',
  description: 'Use nossa roleta clássicos do livros online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'entertainment, livros, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/classicos-do-livros',
  openGraph: {
    title: 'Clássicos do livros - Roleta Online Grátis',
    description: 'Use nossa roleta clássicos do livros online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/classicos-do-livros',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/classicos-do-livros',
        width: 1200,
        height: 630,
        alt: 'Clássicos do livros - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clássicos do livros - Roleta Online Grátis',
    description: 'Use nossa roleta clássicos do livros online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/classicos-do-livros']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/classicos-do-livros'
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
  "name": "Clássicos do livros - Roleta Online Grátis",
  "description": "Use nossa roleta clássicos do livros online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/classicos-do-livros",
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

export default function classicosdolivrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Clássicos do livros - Roleta Online Grátis"
        seoDescription="Use nossa roleta clássicos do livros online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'classicos-do-livros' }];
}
