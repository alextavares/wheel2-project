// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Sorte e Adivinhação",
  "icon": "🔮",
  "prefix": "Sorte e",
  "suffix": "Adivinhação",
  "keywords": [
    "sorte",
    "futuro",
    "previsão",
    "horóscopo",
    "místico",
    "espiritual"
  ],
  "schemaType": "CreativeWork"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Sorte e Adivinhação - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Sorte e Adivinhação. Crie suas próprias roletas personalizadas.',
  keywords: 'sorte, futuro, previsão, horóscopo, místico, espiritual, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/fortune',
  openGraph: {
    title: 'Sorte e Adivinhação - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Sorte e Adivinhação. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/fortune',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/fortune',
        width: 1200,
        height: 630,
        alt: 'Sorte e Adivinhação - Roletas e Sorteios'
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

export default function fortuneCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
