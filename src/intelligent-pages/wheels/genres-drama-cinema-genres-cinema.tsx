// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "enhanced-movies-47",
  "title": "genres Drama Cinema - genres Cinema",
  "description": "Use esta roleta interativa para decidir genres drama cinema - genres cinema. Gire e deixe a sorte escolher!",
  "category": "movies",
  "items": [
    {
      "id": "item-0",
      "label": "Drama",
      "color": "#FF6B6B",
      "weight": 1.5614382634159396
    },
    {
      "id": "item-1",
      "label": "Clássico",
      "color": "#4ECDC4",
      "weight": 1.4448639825648593
    },
    {
      "id": "item-2",
      "label": "Lançamento",
      "color": "#45B7D1",
      "weight": 2.142088395556873
    },
    {
      "id": "item-3",
      "label": "Série",
      "color": "#96CEB4",
      "weight": 2.339906932193017
    },
    {
      "id": "item-4",
      "label": "Documentário",
      "color": "#FFEAA7",
      "weight": 2.4252237228220994
    },
    {
      "id": "item-5",
      "label": "Animação",
      "color": "#DDA0DD",
      "weight": 1.482036382298155
    }
  ],
  "tags": [
    "roleta drama",
    "escolher drama",
    "sorteio drama",
    "decisão drama",
    "drama genres",
    "roleta para genres",
    "sortear movies",
    "roda da sorte drama"
  ],
  "usageCount": 784,
  "isPopular": false,
  "createdAt": "2025-05-25",
  "seo": {
    "title": "genres Drama Cinema - genres Cinema | Roleta Grátis Online",
    "description": "Ferramenta gratuita para sortear genres drama cinema - genres cinema. Simples, rápido e divertido!",
    "keywords": [
      "roleta drama",
      "escolher drama",
      "sorteio drama",
      "decisão drama",
      "drama genres",
      "roleta para genres",
      "sortear movies",
      "roda da sorte drama"
    ],
    "canonicalUrl": "https://wheelmaker.app/wheel/filmes-escolher-genres-drama-cinema-genres-cinema-v2",
    "schemaType": "Movie",
    "openGraph": {
      "title": "genres Drama Cinema - genres Cinema | Wheel Maker",
      "description": "Use esta roleta interativa para decidir genres drama cinema - genres cinema. Gire e deixe a sorte escolher!",
      "image": "https://wheelmaker.app/og/filmes-escolher-genres-drama-cinema-genres-cinema-v2.jpg",
      "type": "website"
    },
    "urlQuality": {
      "score": 80,
      "optimized": true,
      "suggestions": [
        "Remover stop words para URL mais limpa",
        "Evitar números que não agregam valor semântico"
      ]
    }
  },
  "version": "2.0",
  "lastModified": "2025-07-23",
  "author": "AI Enhanced Generator",
  "slug": "genres-drama-cinema-genres-cinema",
  "seoTitle": "genres Drama Cinema - genres Cinema - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta genres Drama Cinema - genres Cinema online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "roleta drama",
    "escolher drama",
    "sorteio drama",
    "decisão drama",
    "drama genres",
    "roleta para genres",
    "sortear movies",
    "roda da sorte drama"
  ]
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'genres Drama Cinema - genres Cinema - Roleta Online Grátis',
  description: 'Use nossa roleta genres Drama Cinema - genres Cinema online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'roleta drama, escolher drama, sorteio drama, decisão drama, drama genres, roleta para genres, sortear movies, roda da sorte drama',
  canonical: 'https://wheelmaker.app/wheel/genres-drama-cinema-genres-cinema',
  openGraph: {
    title: 'genres Drama Cinema - genres Cinema - Roleta Online Grátis',
    description: 'Use nossa roleta genres Drama Cinema - genres Cinema online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/genres-drama-cinema-genres-cinema',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/genres-drama-cinema-genres-cinema',
        width: 1200,
        height: 630,
        alt: 'genres Drama Cinema - genres Cinema - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'genres Drama Cinema - genres Cinema - Roleta Online Grátis',
    description: 'Use nossa roleta genres Drama Cinema - genres Cinema online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/genres-drama-cinema-genres-cinema']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/genres-drama-cinema-genres-cinema'
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
  "name": "genres Drama Cinema - genres Cinema - Roleta Online Grátis",
  "description": "Use nossa roleta genres Drama Cinema - genres Cinema online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/genres-drama-cinema-genres-cinema",
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

export default function genresdramacinemagenrescinemaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="genres Drama Cinema - genres Cinema - Roleta Online Grátis"
        seoDescription="Use nossa roleta genres Drama Cinema - genres Cinema online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'genres-drama-cinema-genres-cinema' }];
}
