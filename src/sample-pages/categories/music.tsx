// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = {
  "name": "Música e Playlists",
  "icon": "🎵",
  "prefix": "Músicas para",
  "suffix": "Ouvir",
  "keywords": [
    "música",
    "playlist",
    "cantores",
    "álbuns",
    "shows",
    "concertos"
  ],
  "schemaType": "MusicPlaylist"
};

// Templates for this category
const categoryTemplates: WheelTemplate[] = []; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: 'Música e Playlists - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para Música e Playlists. Crie suas próprias roletas personalizadas.',
  keywords: 'música, playlist, cantores, álbuns, shows, concertos, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/music',
  openGraph: {
    title: 'Música e Playlists - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para Música e Playlists. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/music',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/music',
        width: 1200,
        height: 630,
        alt: 'Música e Playlists - Roletas e Sorteios'
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

export default function musicCategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={0}
    />
  );
}
