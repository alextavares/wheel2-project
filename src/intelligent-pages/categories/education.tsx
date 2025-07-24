// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Educação e Aprendizado",
  "icon": "📚",
  "prefix": "Aprender",
  "suffix": "Agora",
  "keywords": [
    "educação",
    "estudo",
    "aprendizado",
    "escola",
    "universidade",
    "conhecimento"
  ],
  "schemaType": "EducationalOrganization"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Educação e Aprendizado - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Educação e Aprendizado. Crie suas próprias roletas personalizadas.',
  keywords: 'educação, estudo, aprendizado, escola, universidade, conhecimento, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/education',
  openGraph: {
    title: 'Educação e Aprendizado - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Educação e Aprendizado. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/education',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/education',
        width: 1200,
        height: 630,
        alt: 'Educação e Aprendizado - Roletas e Sorteios'
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

export default function educationCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
