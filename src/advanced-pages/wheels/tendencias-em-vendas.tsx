// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = {
  "id": "advanced-template-4973",
  "title": "Tendências em vendas",
  "slug": "tendencias-em-vendas",
  "category": "business",
  "subcategory": "vendas",
  "description": "Descubra tendências em vendas com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.",
  "items": [
    {
      "id": "item-0",
      "label": "Marketing Digital",
      "color": "#FF6B6B",
      "weight": 2
    },
    {
      "id": "item-1",
      "label": "Vendas B2B",
      "color": "#4ECDC4",
      "weight": 1.9
    },
    {
      "id": "item-2",
      "label": "Liderança Ágil",
      "color": "#45B7D1",
      "weight": 1.8
    },
    {
      "id": "item-3",
      "label": "Empreendedorismo",
      "color": "#96CEB4",
      "weight": 1.7
    },
    {
      "id": "item-4",
      "label": "Investimentos",
      "color": "#FFEAA7",
      "weight": 1.6
    },
    {
      "id": "item-5",
      "label": "Networking",
      "color": "#DDA0DD",
      "weight": 1.5
    },
    {
      "id": "item-6",
      "label": "Inovação",
      "color": "#F39C12",
      "weight": 1.4
    },
    {
      "id": "item-7",
      "label": "Gestão de Projetos",
      "color": "#E74C3C",
      "weight": 1.2999999999999998
    }
  ],
  "tags": [
    "business",
    "vendas",
    "roleta",
    "decisão",
    "escolha"
  ],
  "seoTitle": "Tendências em vendas - Roleta Online Grátis",
  "seoDescription": "Use nossa roleta tendências em vendas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "keywords": [
    "business",
    "vendas",
    "roleta",
    "sorteio",
    "decisão",
    "online",
    "grátis"
  ],
  "usageCount": 511,
  "isPopular": false,
  "createdAt": "2025-07-24",
  "lastModified": "2025-07-24"
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Tendências em vendas - Roleta Online Grátis',
  description: 'Use nossa roleta tendências em vendas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
  keywords: 'business, vendas, roleta, sorteio, decisão, online, grátis',
  canonical: 'https://wheelmaker.app/wheel/tendencias-em-vendas',
  openGraph: {
    title: 'Tendências em vendas - Roleta Online Grátis',
    description: 'Use nossa roleta tendências em vendas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/tendencias-em-vendas',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/tendencias-em-vendas',
        width: 1200,
        height: 630,
        alt: 'Tendências em vendas - Roleta Online Grátis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tendências em vendas - Roleta Online Grátis',
    description: 'Use nossa roleta tendências em vendas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    images: ['https://wheelmaker.app/api/og/wheel/tendencias-em-vendas']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/tendencias-em-vendas'
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
  "name": "Tendências em vendas - Roleta Online Grátis",
  "description": "Use nossa roleta tendências em vendas online grátis. Ferramenta perfeita para sorteios, decisões e diversão.",
  "url": "https://wheelmaker.app/wheel/tendencias-em-vendas",
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

export default function tendenciasemvendasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="Tendências em vendas - Roleta Online Grátis"
        seoDescription="Use nossa roleta tendências em vendas online grátis. Ferramenta perfeita para sorteios, decisões e diversão."
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: 'tendencias-em-vendas' }];
}
