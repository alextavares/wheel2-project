// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Trabalho e Carreira",
  "icon": "💼",
  "prefix": "Trabalho e",
  "suffix": "Produtividade",
  "keywords": [
    "trabalho",
    "emprego",
    "carreira",
    "negócios",
    "empresa",
    "produtividade"
  ],
  "schemaType": "Organization"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Trabalho e Carreira - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Trabalho e Carreira. Crie suas próprias roletas personalizadas.',
  keywords: 'trabalho, emprego, carreira, negócios, empresa, produtividade, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/work',
  openGraph: {
    title: 'Trabalho e Carreira - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Trabalho e Carreira. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/work',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/work',
        width: 1200,
        height: 630,
        alt: 'Trabalho e Carreira - Roletas e Sorteios'
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

export default function workCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
