import { Locale } from '@/lib/i18n'
import { generateSEOPageData } from '@/lib/seoPageGenerator'
import WheelComponent from '@/components/Wheel'
import { getAllSEORoutes } from '@/lib/seoRoutes'

interface SEOWheelPageProps {
  params: Promise<{
    locale: Locale
    category: string
    slug: string
  }>
}

// Gerar parâmetros estáticos para todas as rotas SEO
export async function generateStaticParams() {
  // Retornar apenas alguns parâmetros de exemplo para evitar timeout
  const locales = ['pt', 'en', 'es', 'fr']
  const categories = ['food', 'music', 'movies', 'education', 'games', 'decisions']
  const templates = ['whatToEatToday', 'chooseRestaurant', 'lunchDecision', 'chooseMusic', 'pickPlaylist', 'netflixDecision']
  
  const params = []
  
  for (const locale of locales) {
    for (const category of categories) {
      for (const template of templates.slice(0, 2)) { // Limitar para evitar timeout
        params.push({
          locale,
          category,
          slug: `${template}-online-free`
        })
      }
    }
  }
  
  return params.slice(0, 100) // Limitar a 100 páginas para o build
}

export default async function SEOWheelPage({ params }: SEOWheelPageProps) {
  const resolvedParams = await params
  let pageData: any = null
  
  try {
    // Extrair template e modificadores do slug
    const slugParts = resolvedParams.slug.split('-')
    const template = slugParts[0] // Primeira parte como template
    const modifiers = slugParts.slice(1) // Resto como modificadores
    
    pageData = generateSEOPageData(resolvedParams.locale, resolvedParams.category, template, modifiers)
  } catch (error) {
    console.error('Error generating SEO page data:', error)
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-xl">Página não encontrada</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-white/80">
            {pageData.breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {pageData.h1}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {pageData.description}
          </p>
        </div>

        {/* Wheel Component */}
        <div className="max-w-4xl mx-auto">
          <WheelComponent 
            items={Array.isArray(pageData?.wheelItems) ? pageData.wheelItems : [
              { id: 'item-0', label: 'Opção 1', color: '#FF6B6B', weight: 1 },
              { id: 'item-1', label: 'Opção 2', color: '#4ECDC4', weight: 1 },
              { id: 'item-2', label: 'Opção 3', color: '#45B7D1', weight: 1 },
              { id: 'item-3', label: 'Opção 4', color: '#96CEB4', weight: 1 }
            ]}
            title={pageData?.h1 || 'Roda da Sorte'}
            locale={resolvedParams.locale}
          />
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            {pageData.h2}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-white/90">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {resolvedParams.locale === 'pt' ? 'Como Funciona' : 
                 resolvedParams.locale === 'en' ? 'How It Works' :
                 resolvedParams.locale === 'es' ? 'Cómo Funciona' :
                 'Comment Ça Marche'}
              </h3>
              <ul className="space-y-2">
                <li>• {resolvedParams.locale === 'pt' ? 'Clique no botão "Girar" para começar' : 
                       resolvedParams.locale === 'en' ? 'Click the "Spin" button to start' :
                       resolvedParams.locale === 'es' ? 'Haz clic en el botón "Girar" para comenzar' :
                       'Cliquez sur le bouton "Tourner" pour commencer'}</li>
                <li>• {resolvedParams.locale === 'pt' ? 'A roda girará e escolherá uma opção aleatória' : 
                       resolvedParams.locale === 'en' ? 'The wheel will spin and choose a random option' :
                       resolvedParams.locale === 'es' ? 'La rueda girará y elegirá una opción aleatoria' :
                       'La roue tournera et choisira une option aléatoire'}</li>
                <li>• {resolvedParams.locale === 'pt' ? 'Use o resultado para tomar sua decisão' : 
                       resolvedParams.locale === 'en' ? 'Use the result to make your decision' :
                       resolvedParams.locale === 'es' ? 'Usa el resultado para tomar tu decisión' :
                       'Utilisez le résultat pour prendre votre décision'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {resolvedParams.locale === 'pt' ? 'Benefícios' : 
                 resolvedParams.locale === 'en' ? 'Benefits' :
                 resolvedParams.locale === 'es' ? 'Beneficios' :
                 'Avantages'}
              </h3>
              <ul className="space-y-2">
                <li>• {resolvedParams.locale === 'pt' ? 'Decisões rápidas e sem estresse' : 
                       resolvedParams.locale === 'en' ? 'Quick and stress-free decisions' :
                       resolvedParams.locale === 'es' ? 'Decisiones rápidas y sin estrés' :
                       'Décisions rapides et sans stress'}</li>
                <li>• {resolvedParams.locale === 'pt' ? 'Descubra novas opções' : 
                       resolvedParams.locale === 'en' ? 'Discover new options' :
                       resolvedParams.locale === 'es' ? 'Descubre nuevas opciones' :
                       'Découvrez de nouvelles options'}</li>
                <li>• {resolvedParams.locale === 'pt' ? 'Completamente gratuito' : 
                       resolvedParams.locale === 'en' ? 'Completely free' :
                       resolvedParams.locale === 'es' ? 'Completamente gratuito' :
                       'Complètement gratuit'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            {resolvedParams.locale === 'pt' ? 'Perguntas Frequentes' : 
             resolvedParams.locale === 'en' ? 'Frequently Asked Questions' :
             resolvedParams.locale === 'es' ? 'Preguntas Frecuentes' :
             'Questions Fréquemment Posées'}
          </h3>
          
          <div className="space-y-6 text-white/90">
            <div>
              <h4 className="font-semibold mb-2">
                {resolvedParams.locale === 'pt' ? 'É realmente gratuito?' : 
                 resolvedParams.locale === 'en' ? 'Is it really free?' :
                 resolvedParams.locale === 'es' ? '¿Es realmente gratuito?' :
                 'Est-ce vraiment gratuit?'}
              </h4>
              <p>
                {resolvedParams.locale === 'pt' ? 'Sim! Nossa roda da sorte é 100% gratuita e não requer cadastro.' : 
                 resolvedParams.locale === 'en' ? 'Yes! Our wheel of fortune is 100% free and requires no registration.' :
                 resolvedParams.locale === 'es' ? '¡Sí! Nuestra rueda de la fortuna es 100% gratuita y no requiere registro.' :
                 'Oui! Notre roue de la fortune est 100% gratuite et ne nécessite aucune inscription.'}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">
                {resolvedParams.locale === 'pt' ? 'Posso personalizar as opções?' : 
                 resolvedParams.locale === 'en' ? 'Can I customize the options?' :
                 resolvedParams.locale === 'es' ? '¿Puedo personalizar las opciones?' :
                 'Puis-je personnaliser les options?'}
              </h4>
              <p>
                {resolvedParams.locale === 'pt' ? 'Sim! Você pode adicionar, remover ou editar as opções da roda conforme sua necessidade.' : 
                 resolvedParams.locale === 'en' ? 'Yes! You can add, remove or edit the wheel options according to your needs.' :
                 resolvedParams.locale === 'es' ? '¡Sí! Puedes agregar, eliminar o editar las opciones de la rueda según tus necesidades.' :
                 'Oui! Vous pouvez ajouter, supprimer ou modifier les options de la roue selon vos besoins.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}