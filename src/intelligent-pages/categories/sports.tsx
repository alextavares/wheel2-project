// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Esportes e Fitness",
  "icon": "⚽",
  "prefix": "Esportes para",
  "suffix": "Praticar",
  "keywords": [
    "esportes",
    "futebol",
    "basquete",
    "vôlei",
    "academia",
    "exercício",
    "fitness"
  ],
  "schemaType": "SportsOrganization"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Esportes e Fitness - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Esportes e Fitness. Crie suas próprias roletas personalizadas.',
  keywords: 'esportes, futebol, basquete, vôlei, academia, exercício, fitness, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/sports',
  openGraph: {
    title: 'Esportes e Fitness - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Esportes e Fitness. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/sports',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/sports',
        width: 1200,
        height: 630,
        alt: 'Esportes e Fitness - Roletas e Sorteios'
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

export default function sportsCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
