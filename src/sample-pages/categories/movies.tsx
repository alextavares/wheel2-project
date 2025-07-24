// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Filmes e Séries",
  "icon": "🎬",
  "prefix": "Filmes para",
  "suffix": "Assistir",
  "keywords": [
    "filmes",
    "séries",
    "cinema",
    "streaming",
    "entretenimento",
    "netflix",
    "prime"
  ],
  "schemaType": "Movie"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Filmes e Séries - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Filmes e Séries. Crie suas próprias roletas personalizadas.',
  keywords: 'filmes, séries, cinema, streaming, entretenimento, netflix, prime, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/movies',
  openGraph: {
    title: 'Filmes e Séries - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Filmes e Séries. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/movies',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/movies',
        width: 1200,
        height: 630,
        alt: 'Filmes e Séries - Roletas e Sorteios'
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

export default function moviesCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
