// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Sorteios e Prêmios",
  "icon": "🎁",
  "prefix": "Sorteio de",
  "suffix": "Premiação",
  "keywords": [
    "sorteio",
    "rifa",
    "premiação",
    "ganhar",
    "sortudo",
    "chance"
  ],
  "schemaType": "Raffle"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Sorteios e Prêmios - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Sorteios e Prêmios. Crie suas próprias roletas personalizadas.',
  keywords: 'sorteio, rifa, premiação, ganhar, sortudo, chance, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/raffles',
  openGraph: {
    title: 'Sorteios e Prêmios - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Sorteios e Prêmios. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/raffles',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/raffles',
        width: 1200,
        height: 630,
        alt: 'Sorteios e Prêmios - Roletas e Sorteios'
      }
    ]
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3B82F6'
  }
}

export default function rafflesCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
