import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ALL_WHEEL_ROUTES } from '@/unified-routes';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CATEGORIES = {
  food: {
    name: 'Comida e Restaurantes',
    description: 'Descubra os melhores restaurantes e opções gastronômicas',
    icon: '🍽️'
  },
  games: {
    name: 'Jogos e Entretenimento',
    description: 'Diversão garantida com nossos jogos e atividades',
    icon: '🎮'
  },
  education: {
    name: 'Educação e Aprendizado',
    description: 'Ferramentas educacionais e de aprendizado',
    icon: '📚'
  },
  movies: {
    name: 'Filmes e Séries',
    description: 'O melhor do entretenimento audiovisual',
    icon: '🎬'
  },
  music: {
    name: 'Música e Playlists',
    description: 'Descubra novos sons e artistas',
    icon: '🎵'
  },
  decisions: {
    name: 'Decisões e Escolhas',
    description: 'Ajuda para tomar decisões difíceis',
    icon: '🤔'
  }
};

// Generate static params for category pages
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES[slug as keyof typeof CATEGORIES];
  
  if (!category) {
    return {
      title: 'Categoria não encontrada',
      description: 'A categoria solicitada não foi encontrada.'
    };
  }

  return {
    title: `${category.name} - Roletas Online Grátis`,
    description: `${category.description}. Explore nossa coleção de roletas interativas.`,
    keywords: `${slug}, roleta, sorteio, decisão, online, grátis, ${category.name.toLowerCase()}`,
    openGraph: {
      title: `${category.name} - Roletas Online Grátis`,
      description: `${category.description}. Explore nossa coleção de roletas interativas.`,
      type: 'website',
      url: `https://wheelmaker.app/category/${slug}`,
    },
    alternates: {
      canonical: `https://wheelmaker.app/category/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES[slug as keyof typeof CATEGORIES];
  
  if (!category) {
    notFound();
  }

  // Get wheels for this category
  const categoryWheels = ALL_WHEEL_ROUTES.filter(route => route.category === slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{categoryWheels.length}</div>
                <div className="text-gray-600">Roletas Disponíveis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Grátis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">∞</div>
                <div className="text-gray-600">Usos Ilimitados</div>
              </div>
            </div>
          </div>

          {/* Wheels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryWheels.slice(0, 12).map((wheel) => (
              <div key={wheel.slug} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {wheel.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  Use esta roleta para {wheel.title.toLowerCase()}
                </p>
                <a
                  href={`/wheel/${wheel.slug}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Usar Roleta
                </a>
              </div>
            ))}
          </div>

          {/* Load More */}
          {categoryWheels.length > 12 && (
            <div className="text-center mt-8">
              <p className="text-gray-600">
                E mais {categoryWheels.length - 12} roletas disponíveis!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}