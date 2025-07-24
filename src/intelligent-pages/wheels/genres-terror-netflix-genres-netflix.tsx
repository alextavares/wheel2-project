// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "enhanced-movies-60",
  "title": "genres Terror Netflix - genres Netflix",
  "description": "Use esta roleta interativa para decidir genres terror netflix - genres netflix. Gire e deixe a sorte escolher!",
  "category": "movies",
  "items": [
    {
      "id": "item-0",
      "label": "Terror",
      "color": "#FF6B6B",
      "weight": 1.9196991171944642
    },
    {
      "id": "item-1",
      "label": "Clássico",
      "color": "#4ECDC4",
      "weight": 1.3796910646573262
    },
    {
      "id": "item-2",
      "label": "Lançamento",
      "color": "#45B7D1",
      "weight": 1.025922840869822
    },
    {
      "id": "item-3",
      "label": "Série",
      "color": "#96CEB4",
      "weight": 1.157143153095982
    },
    {
      "id": "item-4",
      "label": "Documentário",
      "color": "#FFEAA7",
      "weight": 2.730530212452279
    },
    {
      "id": "item-5",
      "label": "Animação",
      "color": "#DDA0DD",
      "weight": 1.1260926367137722
    }
  ],
  "tags": [
    "roleta terror",
    "escolher terror",
    "sorteio terror",
    "decisão terror",
    "terror genres",
    "roleta para genres",
    "sortear movies",
    "roda da sorte terror"
  ],
  "usageCount": 2894,
  "isPopular": false,
  "createdAt": "2025-06-26",
  "seo": {
    "title": "genres Terror Netflix - genres Netflix | Roleta Grátis Online",
    "description": "Não consegue decidir? Nossa roleta de movies vai te ajudar a escolher genres terror netflix - genres netflix.",
    "keywords": [
      "roleta terror",
      "escolher terror",
      "sorteio terror",
      "decisão terror",
      "terror genres",
      "roleta para genres",
      "sortear movies",
      "roda da sorte terror"
    ],
    "canonicalUrl": "https://wheelmaker.app/wheel/filmes-escolher-genres-terror-netflix-genres-netflix-v2",
    "schemaType": "Movie",
    "openGraph": {
      "title": "genres Terror Netflix - genres Netflix | Wheel Maker",
      "description": "Ferramenta gratuita para sortear genres terror netflix - genres netflix. Simples, rápido e divertido!",
      "image": "https://wheelmaker.app/og/filmes-escolher-genres-terror-netflix-genres-netflix-v2.jpg",
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
  "slug": "genres-terror-netflix-genres-netflix",
  "seoTitle": "genres Terror Netflix - genres Netflix - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta genres Terror Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "roleta terror",
    "escolher terror",
    "sorteio terror",
    "decisão terror",
    "terror genres",
    "roleta para genres",
    "sortear movies",
    "roda da sorte terror"
  ]
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'genres Terror Netflix - genres Netflix - Roleta Online Grátis',
  description: 'Use nossa roleta genres Terror Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'roleta terror, escolher terror, sorteio terror, decisão terror, terror genres, roleta para genres, sortear movies, roda da sorte terror',
  canonical: 'https://wheelmaker.app/wheel/genres-terror-netflix-genres-netflix',
  openGraph: {
    title: 'genres Terror Netflix - genres Netflix - Roleta Online Grátis',
    description: 'Use nossa roleta genres Terror Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/genres-terror-netflix-genres-netflix',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/genres-terror-netflix-genres-netflix',
        width: 1200,
        height: 630,
        alt: 'genres Terror Netflix - genres Netflix - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'genres Terror Netflix - genres Netflix - Roleta Online Grátis',
    description: 'Use nossa roleta genres Terror Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/genres-terror-netflix-genres-netflix']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/genres-terror-netflix-genres-netflix'
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
  "name": "genres Terror Netflix - genres Netflix - Roleta Online Grátis",
  "description": "Use nossa roleta genres Terror Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/genres-terror-netflix-genres-netflix",
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

export default function genresterrornetflixgenresnetflixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="genres Terror Netflix - genres Netflix - Roleta Online Grátis"
        seoDescription="Use nossa roleta genres Terror Netflix - genres Netflix online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'genres-terror-netflix-genres-netflix' }];
}
