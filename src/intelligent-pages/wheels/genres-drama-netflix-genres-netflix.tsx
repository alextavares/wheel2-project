// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "enhanced-movies-42",
  "title": "genres Drama Netflix - genres Netflix",
  "description": "Roleta personalizada para genres drama netflix - genres netflix. Ideal para decisões rápidas e justas.",
  "category": "movies",
  "items": [
    {
      "id": "item-0",
      "label": "Drama",
      "color": "#FF6B6B",
      "weight": 1.0061128662213998
    },
    {
      "id": "item-1",
      "label": "Clássico",
      "color": "#4ECDC4",
      "weight": 2.4983379553175666
    },
    {
      "id": "item-2",
      "label": "Lançamento",
      "color": "#45B7D1",
      "weight": 1.954307739766045
    },
    {
      "id": "item-3",
      "label": "Série",
      "color": "#96CEB4",
      "weight": 1.8192807856871123
    },
    {
      "id": "item-4",
      "label": "Documentário",
      "color": "#FFEAA7",
      "weight": 1.3014927398750424
    },
    {
      "id": "item-5",
      "label": "Animação",
      "color": "#DDA0DD",
      "weight": 2.2711975397537536
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
  "usageCount": 943,
  "isPopular": false,
  "createdAt": "2025-06-30",
  "seo": {
    "title": "genres Drama Netflix - genres Netflix | Roleta Grátis Online",
    "description": "Não consegue decidir? Nossa roleta de movies vai te ajudar a escolher genres drama netflix - genres netflix.",
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
    "canonicalUrl": "https://wheelmaker.app/wheel/filmes-escolher-genres-drama-netflix-genres-netflix-v2",
    "schemaType": "Movie",
    "openGraph": {
      "title": "genres Drama Netflix - genres Netflix | Wheel Maker",
      "description": "Não consegue decidir? Nossa roleta de movies vai te ajudar a escolher genres drama netflix - genres netflix.",
      "image": "https://wheelmaker.app/og/filmes-escolher-genres-drama-netflix-genres-netflix-v2.jpg",
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
  "slug": "genres-drama-netflix-genres-netflix",
  "seoTitle": "genres Drama Netflix - genres Netflix - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta genres Drama Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
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
  title: 'genres Drama Netflix - genres Netflix - Roleta Online Grátis',
  description: 'Use nossa roleta genres Drama Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'roleta drama, escolher drama, sorteio drama, decisão drama, drama genres, roleta para genres, sortear movies, roda da sorte drama',
  canonical: 'https://wheelmaker.app/wheel/genres-drama-netflix-genres-netflix',
  openGraph: {
    title: 'genres Drama Netflix - genres Netflix - Roleta Online Grátis',
    description: 'Use nossa roleta genres Drama Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/genres-drama-netflix-genres-netflix',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/genres-drama-netflix-genres-netflix',
        width: 1200,
        height: 630,
        alt: 'genres Drama Netflix - genres Netflix - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'genres Drama Netflix - genres Netflix - Roleta Online Grátis',
    description: 'Use nossa roleta genres Drama Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/genres-drama-netflix-genres-netflix']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/genres-drama-netflix-genres-netflix'
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
  "name": "genres Drama Netflix - genres Netflix - Roleta Online Grátis",
  "description": "Use nossa roleta genres Drama Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/genres-drama-netflix-genres-netflix",
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

export default function genresdramanetflixgenresnetflixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="genres Drama Netflix - genres Netflix - Roleta Online Grátis"
        seoDescription="Use nossa roleta genres Drama Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'genres-drama-netflix-genres-netflix' }];
}
