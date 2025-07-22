import React from 'react';

interface ModernLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentView: string;
  onViewChange: (view: 'wheel' | 'templates' | 'store') => void;
  templatesCount: number;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({
  children,
  title,
  subtitle,
  currentView,
  onViewChange,
  templatesCount
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-[100px]">
      {/* Header Compacto */}
      <header className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo e Título Compacto */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-sm">🎯</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-gray-600">{subtitle}</p>
                )}
              </div>
            </div>
            
            {/* Navigation Compacta */}
            <div className="flex gap-1">
              <button
                onClick={() => onViewChange('wheel')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'wheel'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white'
                }`}
              >
                🎯 Roda
              </button>
              
              <button
                onClick={() => onViewChange('templates')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'templates'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white'
                }`}
              >
                📚 Templates
                <span className="ml-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded-full">
                  {templatesCount}
                </span>
              </button>
              
              <button
                onClick={() => onViewChange('store')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'store'
                    ? 'bg-green-500 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white'
                }`}
              >
                🏪 Store
                <span className="ml-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
                  NEW
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-lg border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Criado com ❤️ usando Next.js e Tailwind CSS
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                🎯 Roleta Interativa
              </span>
              <span className="flex items-center gap-1">
                📱 Responsivo
              </span>
              <span className="flex items-center gap-1">
                🎨 Design Moderno
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLayout;