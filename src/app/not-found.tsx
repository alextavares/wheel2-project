import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página não encontrada - Wheel Maker',
  description: 'A página que você está procurando não foi encontrada. Volte para a página inicial e explore nossos templates.'
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone de erro */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🎯</div>
          <div className="text-6xl font-bold text-gray-800 mb-2">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Página não encontrada
          </h1>
          <p className="text-gray-600 mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
            Que tal explorar nossos templates incríveis?
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🏠 Voltar para a Página Inicial
          </Link>
          
          <Link
            href="/?view=templates"
            className="block w-full bg-white text-gray-700 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            📚 Explorar Templates
          </Link>
        </div>

        {/* Sugestões */}
        <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">💡 Sugestões:</h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li>• Verifique se a URL está correta</li>
            <li>• Explore nossos 10.000+ templates</li>
            <li>• Crie sua própria roda personalizada</li>
            <li>• Use nossa busca inteligente</li>
          </ul>
        </div>

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">10K+</div>
            <div className="text-xs text-blue-500 font-medium">Templates</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-purple-500 font-medium">Categorias</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <div className="text-2xl font-bold text-green-600">∞</div>
            <div className="text-xs text-green-500 font-medium">Possibilidades</div>
          </div>
        </div>
      </div>
    </div>
  );
}