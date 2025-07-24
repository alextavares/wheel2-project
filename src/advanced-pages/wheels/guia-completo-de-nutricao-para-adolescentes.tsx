// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4982",
  "title": "Guia completo de nutricao para adolescentes",
  "slug": "guia-completo-de-nutricao-para-adolescentes",
  "category": "health",
  "subcategory": "nutricao",
  "description": "Descubra guia completo de nutricao para adolescentes com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Corrida Matinal",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Yoga Relaxante",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "Meditação",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Musculação",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Natação",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Pilates",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Crossfit",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Caminhada",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "health",
    "nutricao",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Guia completo de nutricao para adolescentes - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta guia completo de nutricao para adolescentes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "health",
    "nutricao",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 8557,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Guia completo de nutricao para adolescentes - Roleta Online Grátis',
  description: 'Use nossa roleta guia completo de nutricao para adolescentes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'health, nutricao, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/guia-completo-de-nutricao-para-adolescentes',
  openGraph: {
    title: 'Guia completo de nutricao para adolescentes - Roleta Online Grátis',
    description: 'Use nossa roleta guia completo de nutricao para adolescentes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/guia-completo-de-nutricao-para-adolescentes',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/guia-completo-de-nutricao-para-adolescentes',
        width: 1200,
        height: 630,
        alt: 'Guia completo de nutricao para adolescentes - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia completo de nutricao para adolescentes - Roleta Online Grátis',
    description: 'Use nossa roleta guia completo de nutricao para adolescentes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/guia-completo-de-nutricao-para-adolescentes']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/guia-completo-de-nutricao-para-adolescentes'
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
  "name": "Guia completo de nutricao para adolescentes - Roleta Online Grátis",
  "description": "Use nossa roleta guia completo de nutricao para adolescentes online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/guia-completo-de-nutricao-para-adolescentes",
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

export default function guiacompletodenutricaoparaadolescentesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Guia completo de nutricao para adolescentes - Roleta Online Grátis"
        seoDescription="Use nossa roleta guia completo de nutricao para adolescentes online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'guia-completo-de-nutricao-para-adolescentes' }];
}
