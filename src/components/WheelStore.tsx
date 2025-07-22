'use client';

import React, { useState } from 'react';

interface WheelItem {
  id: string;
  text: string;
  color: string;
  weight?: number;
}

interface CommunityWheel {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  items: WheelItem[];
  downloads: number;
  rating: number;
  tags: string[];
  createdAt: string;
  isVerified: boolean;
  isFeatured: boolean;
}

interface WheelStoreProps {
  onWheelSelect: (wheel: CommunityWheel) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Dados simulados da comunidade (inspirado no SpinTheWheel.app)
const COMMUNITY_WHEELS: CommunityWheel[] = [
  {
    id: 'cw1',
    title: 'Países do Mundo',
    description: 'Descubra um país aleatório para sua próxima viagem dos sonhos!',
    author: 'TravelLover',
    category: 'Viagem',
    items: [
      { id: '1', text: 'Brasil', color: '#27AE60' },
      { id: '2', text: 'Japão', color: '#E74C3C' },
      { id: '3', text: 'França', color: '#3498DB' },
      { id: '4', text: 'Austrália', color: '#F39C12' },
      { id: '5', text: 'Canadá', color: '#9B59B6' },
      { id: '6', text: 'Itália', color: '#1ABC9C' },
      { id: '7', text: 'Coreia do Sul', color: '#E67E22' },
      { id: '8', text: 'Alemanha', color: '#34495E' }
    ],
    downloads: 15420,
    rating: 4.8,
    tags: ['viagem', 'países', 'geografia', 'aventura'],
    createdAt: '2024-01-15',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 'cw2',
    title: 'Desafios de Exercício',
    description: 'Mantenha-se ativo com exercícios aleatórios divertidos!',
    author: 'FitnessGuru',
    category: 'Saúde',
    items: [
      { id: '1', text: '20 Flexões', color: '#E74C3C' },
      { id: '2', text: '30 Abdominais', color: '#3498DB' },
      { id: '3', text: '1 min Prancha', color: '#27AE60' },
      { id: '4', text: '15 Burpees', color: '#F39C12' },
      { id: '5', text: '25 Agachamentos', color: '#9B59B6' },
      { id: '6', text: '30s Polichinelos', color: '#1ABC9C' }
    ],
    downloads: 8930,
    rating: 4.6,
    tags: ['exercício', 'fitness', 'saúde', 'desafio'],
    createdAt: '2024-01-10',
    isVerified: true,
    isFeatured: false
  },
  {
    id: 'cw3',
    title: 'Ideias de Data',
    description: 'Encontros românticos e divertidos para casais!',
    author: 'LoveExpert',
    category: 'Relacionamento',
    items: [
      { id: '1', text: 'Jantar romântico', color: '#E91E63' },
      { id: '2', text: 'Cinema', color: '#9C27B0' },
      { id: '3', text: 'Piquenique no parque', color: '#4CAF50' },
      { id: '4', text: 'Museu de arte', color: '#FF9800' },
      { id: '5', text: 'Aula de dança', color: '#F44336' },
      { id: '6', text: 'Escape room', color: '#2196F3' },
      { id: '7', text: 'Trilha na natureza', color: '#8BC34A' },
      { id: '8', text: 'Noite de jogos', color: '#795548' }
    ],
    downloads: 12650,
    rating: 4.9,
    tags: ['romance', 'encontro', 'casal', 'diversão'],
    createdAt: '2024-01-08',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 'cw4',
    title: 'Profissões Futuras',
    description: 'Explore carreiras interessantes para o futuro!',
    author: 'CareerCoach',
    category: 'Educação',
    items: [
      { id: '1', text: 'Desenvolvedor IA', color: '#3F51B5' },
      { id: '2', text: 'Designer UX/UI', color: '#E91E63' },
      { id: '3', text: 'Cientista de Dados', color: '#009688' },
      { id: '4', text: 'Especialista em Cibersegurança', color: '#FF5722' },
      { id: '5', text: 'Engenheiro de Robótica', color: '#607D8B' },
      { id: '6', text: 'Criador de Conteúdo', color: '#FF9800' }
    ],
    downloads: 6780,
    rating: 4.4,
    tags: ['carreira', 'futuro', 'tecnologia', 'profissão'],
    createdAt: '2024-01-05',
    isVerified: false,
    isFeatured: false
  },
  {
    id: 'cw5',
    title: 'Receitas Rápidas',
    description: 'Pratos deliciosos para fazer em 30 minutos!',
    author: 'ChefExpress',
    category: 'Culinária',
    items: [
      { id: '1', text: 'Macarrão Carbonara', color: '#FFC107' },
      { id: '2', text: 'Salada Caesar', color: '#4CAF50' },
      { id: '3', text: 'Omelete de Queijo', color: '#FF9800' },
      { id: '4', text: 'Sanduíche Grelhado', color: '#795548' },
      { id: '5', text: 'Sopa de Tomate', color: '#F44336' },
      { id: '6', text: 'Wrap de Frango', color: '#9C27B0' }
    ],
    downloads: 9340,
    rating: 4.7,
    tags: ['culinária', 'receitas', 'rápido', 'fácil'],
    createdAt: '2024-01-03',
    isVerified: true,
    isFeatured: false
  }
];

const CATEGORIES = ['Todos', 'Viagem', 'Saúde', 'Relacionamento', 'Educação', 'Culinária', 'Entretenimento'];

export default function WheelStore({ onWheelSelect, isOpen, onClose }: WheelStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'recent'>('downloads');

  if (!isOpen) return null;

  const filteredWheels = COMMUNITY_WHEELS
    .filter(wheel => {
      const matchesCategory = selectedCategory === 'Todos' || wheel.category === selectedCategory;
      const matchesSearch = wheel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           wheel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           wheel.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const handleWheelSelect = (wheel: CommunityWheel) => {
    onWheelSelect(wheel);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">🏪 Wheel Store</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Descubra milhares de rodas criadas pela comunidade! Baixe e use instantaneamente.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Buscar rodas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'downloads' | 'rating' | 'recent')}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="downloads">Mais Baixadas</option>
              <option value="rating">Melhor Avaliadas</option>
              <option value="recent">Mais Recentes</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Featured Section */}
          {selectedCategory === 'Todos' && searchQuery === '' && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                ⭐ Rodas em Destaque
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {filteredWheels.filter(wheel => wheel.isFeatured).map(wheel => (
                  <div key={wheel.id} className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          {wheel.title}
                          {wheel.isVerified && <span className="text-blue-500">✓</span>}
                        </h4>
                        <p className="text-gray-600 text-sm">{wheel.description}</p>
                      </div>
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                        DESTAQUE
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span>👤 {wheel.author}</span>
                      <span>📁 {wheel.category}</span>
                      <span>⭐ {wheel.rating}</span>
                      <span>📥 {wheel.downloads.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {wheel.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleWheelSelect(wheel)}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      📥 Baixar e Usar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Wheels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWheels.map(wheel => (
              <div key={wheel.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold flex items-center gap-2">
                    {wheel.title}
                    {wheel.isVerified && <span className="text-blue-500 text-sm">✓</span>}
                  </h4>
                  {wheel.isFeatured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">⭐</span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{wheel.description}</p>
                
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span>👤 {wheel.author}</span>
                  <span>📁 {wheel.category}</span>
                </div>
                
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="flex items-center gap-1">
                    ⭐ {wheel.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    📥 {wheel.downloads.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    🎯 {wheel.items.length} itens
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {wheel.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => handleWheelSelect(wheel)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  📥 Baixar e Usar
                </button>
              </div>
            ))}
          </div>

          {filteredWheels.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Nenhuma roda encontrada</h3>
              <p className="text-gray-600">Tente ajustar seus filtros ou termo de busca.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}