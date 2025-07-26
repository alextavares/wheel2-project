'use client';

import React from 'react';
import Link from 'next/link';
import { WHEEL_ROUTES } from '@/generated-pages/routes';

interface RelatedWheelsProps {
  currentSlug: string;
  category: string;
  maxItems?: number;
}

export default function RelatedWheels({ currentSlug, category, maxItems = 6 }: RelatedWheelsProps) {
  // Filtrar rotas da mesma categoria, excluindo a página atual
  const relatedRoutes = WHEEL_ROUTES
    .filter(route => route.category === category && route.slug !== currentSlug)
    .slice(0, maxItems);

  if (relatedRoutes.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        🎯 Outras Roletas de {category === 'food' ? 'Comida' : 
                              category === 'travel' ? 'Viagem' : 
                              category === 'games' ? 'Jogos' : 
                              category === 'movies' ? 'Filmes' : 
                              category === 'music' ? 'Música' : 
                              category === 'education' ? 'Educação' : 
                              category === 'entertainment' ? 'Entretenimento' : 
                              category}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedRoutes.map((route) => (
          <Link
            key={route.slug}
            href={`/wheel/${route.slug}`}
            className="group block"
          >
            <div className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 border border-purple-300/20 hover:border-purple-300/40">
              {/* Ícone da categoria */}
              <div className="text-2xl mb-2 text-center">
                {category === 'food' && '🍕'}
                {category === 'travel' && '✈️'}
                {category === 'games' && '🎮'}
                {category === 'movies' && '🎬'}
                {category === 'music' && '🎵'}
                {category === 'education' && '📚'}
                {category === 'entertainment' && '🎪'}
                {!['food', 'travel', 'games', 'movies', 'music', 'education', 'entertainment'].includes(category) && '🎯'}
              </div>
              
              {/* Título */}
              <h3 className="text-white font-semibold text-sm mb-2 text-center group-hover:text-purple-200 line-clamp-2">
                {route.title}
              </h3>
              
              {/* Indicador de clique */}
              <div className="text-center">
                <span className="text-purple-300 text-xs group-hover:text-purple-200">
                  🎲 Clique para usar
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Link para ver mais da categoria */}
      <div className="text-center mt-6">
        <Link
          href={`/roda-da-sorte/${category}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
        >
          <span>🔍</span>
          Ver todas as roletas de {category === 'food' ? 'Comida' : 
                                   category === 'travel' ? 'Viagem' : 
                                   category === 'games' ? 'Jogos' : 
                                   category === 'movies' ? 'Filmes' : 
                                   category === 'music' ? 'Música' : 
                                   category === 'education' ? 'Educação' : 
                                   category === 'entertainment' ? 'Entretenimento' : 
                                   category}
        </Link>
      </div>
    </div>
  );
}