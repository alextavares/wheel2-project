// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Aleatório e Surpresas",
  "icon": "🎲",
  "prefix": "Aleatório",
  "suffix": "Surpresa",
  "keywords": [
    "aleatório",
    "sorteio",
    "imprevisível",
    "surpresa",
    "chance",
    "probabilidade"
  ],
  "schemaType": "CreativeWork"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Aleatório e Surpresas - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Aleatório e Surpresas. Crie suas próprias roletas personalizadas.',
  keywords: 'aleatório, sorteio, imprevisível, surpresa, chance, probabilidade, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/random',
  openGraph: {
    title: 'Aleatório e Surpresas - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Aleatório e Surpresas. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/random',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/random',
        width: 1200,
        height: 630,
        alt: 'Aleatório e Surpresas - Roletas e Sorteios'
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

export default function randomCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
