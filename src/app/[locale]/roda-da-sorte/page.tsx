'use client'

import { useParams } from 'next/navigation'
import { Locale, t } from '@/lib/i18n'
import { getRoutesByLocale } from '@/lib/seoRoutes'
import Link from 'next/link'
import WheelComponent from '@/components/Wheel'

interface MainWheelPageProps {
  params: {
    locale: Locale
  }
}

export default function MainWheelPage({ params }: MainWheelPageProps) {
  const allRoutes = getRoutesByLocale(params.locale)
  const categoryRoutes = allRoutes.filter(route => route.template === 'category')
  const popularRoutes = allRoutes
    .filter(route => route.priority >= 0.8 && route.template !== 'category')
    .slice(0, 12)

  const primaryKeyword = t(params.locale, 'seo.keywords.primary.0')
  const pageTitle = `${primaryKeyword} Online Grátis | ${t(params.locale, 'seo.siteName')}`
  const pageDescription = t(params.locale, 'seo.mainDescription')

  // Itens padrão para a roda principal
  const defaultWheelItems = [
    t(params.locale, 'categories.food'),
    t(params.locale, 'categories.music'),
    t(params.locale, 'categories.movies'),
    t(params.locale, 'categories.education'),
    t(params.locale, 'categories.games'),
    t(params.locale, 'categories.decisions'),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* SEO Meta Tags */}
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={t(params.locale, 'seo.keywords.primary').join(', ')} />
        <link rel="canonical" href={`https://wheelwheel.vercel.app/${params.locale}/roda-da-sorte`} />
        
        {/* Alternate URLs */}
        <link rel="alternate" hrefLang="pt" href="https://wheelwheel.vercel.app/pt/roda-da-sorte" />
        <link rel="alternate" hrefLang="en" href="https://wheelwheel.vercel.app/en/wheel-of-fortune" />
        <link rel="alternate" hrefLang="es" href="https://wheelwheel.vercel.app/es/rueda-de-la-fortuna" />
        <link rel="alternate" hrefLang="fr" href="https://wheelwheel.vercel.app/fr/roue-de-la-fortune" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://wheelwheel.vercel.app/${params.locale}/roda-da-sorte`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": pageTitle,
              "description": pageDescription,
              "url": `https://wheelwheel.vercel.app/${params.locale}/roda-da-sorte`,
              "applicationCategory": "GameApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": params.locale === 'pt' ? 'BRL' : 'USD'
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2500"
              },
              "featureList": [
                "Roda da sorte gratuita",
                "Múltiplas categorias",
                "Personalização completa",
                "Sem cadastro necessário",
                "Funciona em qualquer dispositivo"
              ]
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
              <span className="text-white">{primaryKeyword}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {primaryKeyword} Online Grátis
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {pageDescription}
          </p>
          
          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              ✨ {params.locale === 'pt' ? 'Gratuito' : params.locale === 'en' ? 'Free' : params.locale === 'es' ? 'Gratis' : 'Gratuit'}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              🎯 {params.locale === 'pt' ? 'Sem Cadastro' : params.locale === 'en' ? 'No Registration' : params.locale === 'es' ? 'Sin Registro' : 'Sans Inscription'}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              📱 {params.locale === 'pt' ? 'Funciona no Celular' : params.locale === 'en' ? 'Mobile Friendly' : params.locale === 'es' ? 'Compatible con Móvil' : 'Compatible Mobile'}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              ⚡ {params.locale === 'pt' ? 'Resultado Instantâneo' : params.locale === 'en' ? 'Instant Result' : params.locale === 'es' ? 'Resultado Instantáneo' : 'Résultat Instantané'}
            </span>
          </div>
        </div>

        {/* Main Wheel */}
        <div className="max-w-4xl mx-auto mb-16">
          <WheelComponent 
            items={defaultWheelItems}
            title={primaryKeyword}
            locale={params.locale}
          />
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {params.locale === 'pt' ? 'Escolha uma Categoria' :
             params.locale === 'en' ? 'Choose a Category' :
             params.locale === 'es' ? 'Elige una Categoría' :
             'Choisissez une Catégorie'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryRoutes.map((route) => {
              const category = route.category
              const categoryName = t(params.locale, `categories.${category}`)
              const categoryDescription = t(params.locale, `seo.templates.${category}.description`)
              
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-3">{categoryName}</h3>
                    <p className="text-white/80 text-sm mb-4">
                      {categoryDescription}
                    </p>
                    <div className="text-purple-200 text-sm">
                      {params.locale === 'pt' ? 'Ver todas as opções →' :
                       params.locale === 'en' ? 'See all options →' :
                       params.locale === 'es' ? 'Ver todas las opciones →' :
                       'Voir toutes les options →'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Popular Wheels Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {params.locale === 'pt' ? 'Rodas Mais Populares' :
             params.locale === 'en' ? 'Most Popular Wheels' :
             params.locale === 'es' ? 'Ruedas Más Populares' :
             'Roues Les Plus Populaires'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route) => {
              const routeParts = route.path.split('/')
              const slug = routeParts[routeParts.length - 1]
              const displayName = slug
                .split('-')
                .slice(0, 4) // Primeiras 4 palavras
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-white">
                    <h4 className="font-medium mb-2">{displayName}</h4>
                    <div className="text-purple-200 text-sm">
                      {params.locale === 'pt' ? 'Usar agora →' :
                       params.locale === 'en' ? 'Use now →' :
                       params.locale === 'es' ? 'Usar ahora →' :
                       'Utiliser maintenant →'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            {params.locale === 'pt' ? 'Como Funciona a Roda da Sorte?' :
             params.locale === 'en' ? 'How Does the Wheel of Fortune Work?' :
             params.locale === 'es' ? '¿Cómo Funciona la Rueda de la Fortuna?' :
             'Comment Fonctionne la Roue de la Fortune?'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-white/90">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {params.locale === 'pt' ? 'Passo a Passo' :
                 params.locale === 'en' ? 'Step by Step' :
                 params.locale === 'es' ? 'Paso a Paso' :
                 'Étape par Étape'}
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  {params.locale === 'pt' ? 'Escolha uma categoria ou use a roda geral' :
                   params.locale === 'en' ? 'Choose a category or use the general wheel' :
                   params.locale === 'es' ? 'Elige una categoría o usa la rueda general' :
                   'Choisissez une catégorie ou utilisez la roue générale'}
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  {params.locale === 'pt' ? 'Clique no botão "Girar" para começar' :
                   params.locale === 'en' ? 'Click the "Spin" button to start' :
                   params.locale === 'es' ? 'Haz clic en el botón "Girar" para comenzar' :
                   'Cliquez sur le bouton "Tourner" pour commencer'}
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  {params.locale === 'pt' ? 'Aguarde a roda parar e veja o resultado' :
                   params.locale === 'en' ? 'Wait for the wheel to stop and see the result' :
                   params.locale === 'es' ? 'Espera a que la rueda se detenga y ve el resultado' :
                   'Attendez que la roue s\'arrête et voyez le résultat'}
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  {params.locale === 'pt' ? 'Use a sugestão ou gire novamente!' :
                   params.locale === 'en' ? 'Use the suggestion or spin again!' :
                   params.locale === 'es' ? '¡Usa la sugerencia o gira de nuevo!' :
                   'Utilisez la suggestion ou tournez à nouveau!'}
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {params.locale === 'pt' ? 'Por que Usar?' :
                 params.locale === 'en' ? 'Why Use It?' :
                 params.locale === 'es' ? '¿Por qué Usarla?' :
                 'Pourquoi l\'Utiliser?'}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {params.locale === 'pt' ? 'Elimina a indecisão rapidamente' :
                   params.locale === 'en' ? 'Eliminates indecision quickly' :
                   params.locale === 'es' ? 'Elimina la indecisión rápidamente' :
                   'Élimine l\'indécision rapidement'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {params.locale === 'pt' ? 'Descobre novas opções e ideias' :
                   params.locale === 'en' ? 'Discover new options and ideas' :
                   params.locale === 'es' ? 'Descubre nuevas opciones e ideas' :
                   'Découvre de nouvelles options et idées'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {params.locale === 'pt' ? 'Torna decisões mais divertidas' :
                   params.locale === 'en' ? 'Makes decisions more fun' :
                   params.locale === 'es' ? 'Hace las decisiones más divertidas' :
                   'Rend les décisions plus amusantes'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {params.locale === 'pt' ? 'Funciona para qualquer situação' :
                   params.locale === 'en' ? 'Works for any situation' :
                   params.locale === 'es' ? 'Funciona para cualquier situación' :
                   'Fonctionne pour toute situation'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            {params.locale === 'pt' ? 'Perguntas Frequentes' :
             params.locale === 'en' ? 'Frequently Asked Questions' :
             params.locale === 'es' ? 'Preguntas Frecuentes' :
             'Questions Fréquemment Posées'}
          </h3>
          
          <div className="space-y-6 text-white/90">
            <div>
              <h4 className="font-semibold mb-2">
                {params.locale === 'pt' ? 'A roda da sorte é realmente aleatória?' :
                 params.locale === 'en' ? 'Is the wheel of fortune really random?' :
                 params.locale === 'es' ? '¿La rueda de la fortuna es realmente aleatoria?' :
                 'La roue de la fortune est-elle vraiment aléatoire?'}
              </h4>
              <p>
                {params.locale === 'pt' ? 'Sim! Usamos algoritmos de randomização avançados para garantir que cada resultado seja completamente aleatório e imparcial.' :
                 params.locale === 'en' ? 'Yes! We use advanced randomization algorithms to ensure each result is completely random and unbiased.' :
                 params.locale === 'es' ? '¡Sí! Usamos algoritmos de aleatorización avanzados para garantizar que cada resultado sea completamente aleatorio e imparcial.' :
                 'Oui! Nous utilisons des algorithmes de randomisation avancés pour garantir que chaque résultat soit complètement aléatoire et impartial.'}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">
                {params.locale === 'pt' ? 'Posso criar minha própria roda personalizada?' :
                 params.locale === 'en' ? 'Can I create my own custom wheel?' :
                 params.locale === 'es' ? '¿Puedo crear mi propia rueda personalizada?' :
                 'Puis-je créer ma propre roue personnalisée?'}
              </h4>
              <p>
                {params.locale === 'pt' ? 'Sim! Você pode adicionar, remover ou editar qualquer item da roda para criar uma experiência totalmente personalizada.' :
                 params.locale === 'en' ? 'Yes! You can add, remove or edit any wheel item to create a completely personalized experience.' :
                 params.locale === 'es' ? '¡Sí! Puedes agregar, eliminar o editar cualquier elemento de la rueda para crear una experiencia completamente personalizada.' :
                 'Oui! Vous pouvez ajouter, supprimer ou modifier tout élément de la roue pour créer une expérience complètement personnalisée.'}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">
                {params.locale === 'pt' ? 'Funciona no celular?' :
                 params.locale === 'en' ? 'Does it work on mobile?' :
                 params.locale === 'es' ? '¿Funciona en el móvil?' :
                 'Ça marche sur mobile?'}
              </h4>
              <p>
                {params.locale === 'pt' ? 'Perfeitamente! Nossa roda da sorte é otimizada para funcionar em qualquer dispositivo: celular, tablet ou computador.' :
                 params.locale === 'en' ? 'Perfectly! Our wheel of fortune is optimized to work on any device: mobile, tablet or computer.' :
                 params.locale === 'es' ? '¡Perfectamente! Nuestra rueda de la fortuna está optimizada para funcionar en cualquier dispositivo: móvil, tablet o computadora.' :
                 'Parfaitement! Notre roue de la fortune est optimisée pour fonctionner sur tout appareil: mobile, tablette ou ordinateur.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}