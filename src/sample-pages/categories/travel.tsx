// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Viagens e Turismo",
  "icon": "✈️",
  "prefix": "Destinos para",
  "suffix": "Viajar",
  "keywords": [
    "viagem",
    "turismo",
    "destinos",
    "férias",
    "aventura",
    "passeio"
  ],
  "schemaType": "Place"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Viagens e Turismo - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Viagens e Turismo. Crie suas próprias roletas personalizadas.',
  keywords: 'viagem, turismo, destinos, férias, aventura, passeio, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/travel',
  openGraph: {
    title: 'Viagens e Turismo - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Viagens e Turismo. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/travel',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/travel',
        width: 1200,
        height: 630,
        alt: 'Viagens e Turismo - Roletas e Sorteios'
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

export default function travelCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
