// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Decisões e Escolhas",
  "icon": "🤔",
  "prefix": "Decidir",
  "suffix": "Agora",
  "keywords": [
    "decisão",
    "escolha",
    "opção",
    "votação",
    "sorteio",
    "probabilidade"
  ],
  "schemaType": "DecisionSupport"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Decisões e Escolhas - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Decisões e Escolhas. Crie suas próprias roletas personalizadas.',
  keywords: 'decisão, escolha, opção, votação, sorteio, probabilidade, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/decisions',
  openGraph: {
    title: 'Decisões e Escolhas - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Decisões e Escolhas. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/decisions',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/decisions',
        width: 1200,
        height: 630,
        alt: 'Decisões e Escolhas - Roletas e Sorteios'
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

export default function decisionsCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
