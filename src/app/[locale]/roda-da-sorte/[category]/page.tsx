'use client'

import { useParams } from 'next/navigation'
import { Locale, t } from '@/lib/i18n'
import { getRoutesByCategory } from '@/lib/seoRoutes'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    locale: Locale
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryRoutes = getRoutesByCategory(params.category)
    .filter(route => route.locale === params.locale)
    .slice(0, 20) // Limitar a 20 para performance

  const categoryName = t(params.locale, `categories.${params.category}`)
  const primaryKeyword = t(params.locale, 'seo.keywords.primary.0')
  
  const pageTitle = `${primaryKeyword} ${categoryName} | ${t(params.locale, 'seo.siteName')}`
  const pageDescription = t(params.locale, `seo.templates.${params.category}.description`)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* SEO Meta Tags */}
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={t(params.locale, `seo.templates.${params.category}.keywords`).join(', ')} />
        <link rel="canonical" href={`https://wheelwheel.vercel.app/${params.locale}/roda-da-sorte/${params.category}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": pageTitle,
              "description": pageDescription,
              "url": `https://wheelwheel.vercel.app/${params.locale}/roda-da-sorte/${params.category}`,
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": categoryRoutes.length,
                "itemListElement": categoryRoutes.map((route, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `https://wheelwheel.vercel.app${route.path}`
                }))
              }
            })
          }}
        />
      </head>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-white/80">
            <li>
              <Link href={`/${params.locale}`} className="hover:text-white transition-colors">
                {t(params.locale, 'navigation.home')}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={`/${params.locale}/roda-da-sorte`} className="hover:text-white transition-colors">
                {primaryKeyword}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-white">{categoryName}</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {primaryKeyword} {categoryName}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {pageDescription}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categoryRoutes.map((route, index) => {
            const routeParts = route.path.split('/')
            const slug = routeParts[routeParts.length - 1]
            const displayName = slug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')

            return (
              <Link
                key={route.path}
                href={route.path}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-white">
                  <h3 className="text-lg font-semibold mb-2">{displayName}</h3>
                  <p className="text-white/80 text-sm">
                    {params.locale === 'pt' ? 'Clique para usar esta roda da sorte' :
                     params.locale === 'en' ? 'Click to use this wheel of fortune' :
                     params.locale === 'es' ? 'Haz clic para usar esta rueda de la fortuna' :
                     'Cliquez pour utiliser cette roue de la fortune'}
                  </p>
                  <div className="mt-4 text-purple-200 text-sm">
                    {params.locale === 'pt' ? 'Gratuito • Online • Rápido' :
                     params.locale === 'en' ? 'Free • Online • Fast' :
                     params.locale === 'es' ? 'Gratis • Online • Rápido' :
                     'Gratuit • En ligne • Rapide'}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            {params.locale === 'pt' ? `Por que usar ${primaryKeyword} para ${categoryName}?` :
             params.locale === 'en' ? `Why use ${primaryKeyword} for ${categoryName}?` :
             params.locale === 'es' ? `¿Por qué usar ${primaryKeyword} para ${categoryName}?` :
             `Pourquoi utiliser ${primaryKeyword} pour ${categoryName}?`}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-white/90">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {params.locale === 'pt' ? 'Vantagens' :
                 params.locale === 'en' ? 'Advantages' :
                 params.locale === 'es' ? 'Ventajas' :
                 'Avantages'}
              </h3>
              <ul className="space-y-2">
                <li>• {params.locale === 'pt' ? 'Decisões rápidas e imparciais' :
                       params.locale === 'en' ? 'Quick and unbiased decisions' :
                       params.locale === 'es' ? 'Decisiones rápidas e imparciales' :
                       'Décisions rapides et impartiales'}</li>
                <li>• {params.locale === 'pt' ? 'Elimina a indecisão' :
                       params.locale === 'en' ? 'Eliminates indecision' :
                       params.locale === 'es' ? 'Elimina la indecisión' :
                       'Élimine l\'indécision'}</li>
                <li>• {params.locale === 'pt' ? 'Descobre novas opções' :
                       params.locale === 'en' ? 'Discover new options' :
                       params.locale === 'es' ? 'Descubre nuevas opciones' :
                       'Découvre de nouvelles options'}</li>
                <li>• {params.locale === 'pt' ? 'Divertido e interativo' :
                       params.locale === 'en' ? 'Fun and interactive' :
                       params.locale === 'es' ? 'Divertido e interactivo' :
                       'Amusant et interactif'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {params.locale === 'pt' ? 'Como Usar' :
                 params.locale === 'en' ? 'How to Use' :
                 params.locale === 'es' ? 'Cómo Usar' :
                 'Comment Utiliser'}
              </h3>
              <ol className="space-y-2">
                <li>1. {params.locale === 'pt' ? 'Escolha uma das opções acima' :
                        params.locale === 'en' ? 'Choose one of the options above' :
                        params.locale === 'es' ? 'Elige una de las opciones de arriba' :
                        'Choisissez une des options ci-dessus'}</li>
                <li>2. {params.locale === 'pt' ? 'Clique no botão "Girar"' :
                        params.locale === 'en' ? 'Click the "Spin" button' :
                        params.locale === 'es' ? 'Haz clic en el botón "Girar"' :
                        'Cliquez sur le bouton "Tourner"'}</li>
                <li>3. {params.locale === 'pt' ? 'Aguarde o resultado' :
                        params.locale === 'en' ? 'Wait for the result' :
                        params.locale === 'es' ? 'Espera el resultado' :
                        'Attendez le résultat'}</li>
                <li>4. {params.locale === 'pt' ? 'Use a sugestão da roda!' :
                        params.locale === 'en' ? 'Use the wheel\'s suggestion!' :
                        params.locale === 'es' ? '¡Usa la sugerencia de la rueda!' :
                        'Utilisez la suggestion de la roue!'}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Related Categories */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {params.locale === 'pt' ? 'Outras Categorias' :
             params.locale === 'en' ? 'Other Categories' :
             params.locale === 'es' ? 'Otras Categorías' :
             'Autres Catégories'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['food', 'music', 'movies', 'education', 'games', 'decisions']
              .filter(cat => cat !== params.category)
              .slice(0, 6)
              .map(category => (
                <Link
                  key={category}
                  href={`/${params.locale}/roda-da-sorte/${category}`}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-white font-medium">
                    {t(params.locale, `categories.${category}`)}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}