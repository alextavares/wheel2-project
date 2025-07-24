// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Jogos e Entretenimento",
  "icon": "🎮",
  "prefix": "Jogos de",
  "suffix": "Divertidos",
  "keywords": [
    "jogos",
    "entretenimento",
    "diversão",
    "festa",
    "recreação",
    "lazer"
  ],
  "schemaType": "Game"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Jogos e Entretenimento - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Jogos e Entretenimento. Crie suas próprias roletas personalizadas.',
  keywords: 'jogos, entretenimento, diversão, festa, recreação, lazer, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/games',
  openGraph: {
    title: 'Jogos e Entretenimento - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Jogos e Entretenimento. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/games',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/games',
        width: 1200,
        height: 630,
        alt: 'Jogos e Entretenimento - Roletas e Sorteios'
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

export default function gamesCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
