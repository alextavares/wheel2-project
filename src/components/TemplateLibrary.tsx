import React from 'react';
import { WheelTemplate, CATEGORIES } from '@/data/templates';

interface TemplateCardProps {
  template: WheelTemplate;
  onSelect: (template: WheelTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const category = Object.values(CATEGORIES).find(cat => cat.id === template.category);
  
  return (
    <div 
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/50 hover:border-blue-200 hover:scale-[1.02]"
      onClick={() => onSelect(template)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category?.icon}</span>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg leading-tight">
                {template.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{category?.name}</p>
            </div>
          </div>
          {template.isPopular && (
            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm">
              🔥 Popular
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {template.description}
        </p>

        {/* Preview dos itens */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {template.items.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100"
              >
                <div 
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-700 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
            {template.items.length > 6 && (
              <div className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1.5">
                <span className="text-xs text-gray-500 font-medium">
                  +{template.items.length - 6}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {template.usageCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {template.items.length} itens
            </span>
          </div>
          
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl transition-colors font-semibold shadow-sm hover:shadow-md">
            Usar Template
          </button>
        </div>
      </div>
    </div>
  );
};

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:text-blue-600 border border-gray-200 hover:border-blue-300 shadow-sm'
          }`}
        >
          🌟 Todos
        </button>
        
        {Object.values(CATEGORIES).map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-blue-600 border border-gray-200 hover:border-blue-300 shadow-sm'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar templates... (ex: comida, jogos, decisão)"
        className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white/80 backdrop-blur-sm shadow-lg placeholder-gray-500 font-medium text-base leading-relaxed"
      />
    </div>
  );
};