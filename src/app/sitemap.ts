import { MetadataRoute } from 'next'
import { Locale } from '@/lib/i18n'
import { generateInternationalTemplates } from '@/lib/internationalTemplates'
import { getAllSEORoutes } from '@/lib/seoRoutes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wheelwheel.vercel.app'
  const locales: Locale[] = ['pt', 'en', 'es', 'fr']
  
  const routes: MetadataRoute.Sitemap = []

  // URLs base para cada idioma
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
  })

  // URLs estáticas principais
  const staticPages = [
    'wheel',
    'about',
    'privacy',
    'terms'
  ]

  locales.forEach(locale => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  // URLs SEO otimizadas usando o novo sistema de rotas
  const seoRoutes = getAllSEORoutes()
  seoRoutes.forEach(seoRoute => {
    routes.push({
      url: `${baseUrl}${seoRoute.path}`,
      lastModified: new Date(),
      changeFrequency: seoRoute.changeFrequency,
      priority: seoRoute.priority,
    })
  })

  // URLs de roletas estáticas (templates internacionais) - mantendo compatibilidade
  const internationalTemplates = generateInternationalTemplates()
  Object.entries(internationalTemplates).forEach(([locale, template]) => {
    if (template && template.slug) {
      routes.push({
        url: `${baseUrl}/${locale}/wheel/${template.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  })

  // URLs de roletas dinâmicas otimizadas para SEO
  const dynamicWheelsOptimized = [
    // Português - Palavras-chave golden
    'roda-da-sorte-o-que-comer-hoje-online-gratis',
    'roleta-escolher-restaurante-italiano-perto-de-mim',
    'sortear-pizzaria-delivery-rapido',
    'roda-da-sorte-materia-estudar-enem-hoje',
    'roleta-decidir-curso-online-gratuito',
    'sortear-exercicio-matematica-vestibular',
    'roda-da-sorte-musica-ouvir-trabalho',
    'roleta-playlist-spotify-treino-academia',
    'sortear-banda-show-final-semana',
    'roda-da-sorte-filme-netflix-assistir-hoje',
    'roleta-serie-maratonar-final-semana',
    'sortear-jogo-jogar-amigos-casa',
    'roda-da-sorte-atividade-fazer-chuva',
    'roleta-programa-fim-semana-familia',
    'sortear-nomes-online-gratis-sorteio',
    'roda-da-sorte-personalizada-sala-aula',
    'roleta-decisoes-importantes-vida',
    'decidir-roda-da-sorte-rapido-facil'
  ]

  // Adicionar URLs dinâmicas otimizadas
  dynamicWheelsOptimized.forEach(wheel => {
    routes.push({
      url: `${baseUrl}/pt/wheel/${wheel}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8, // Prioridade maior para URLs otimizadas
    })
  })

  // URLs em inglês para mercado internacional
  const englishOptimizedWheels = [
    'wheel-of-fortune-what-to-eat-today-online-free',
    'spinner-wheel-choose-restaurant-near-me',
    'random-picker-pizza-delivery-quick',
    'decision-wheel-study-topic-exam-today',
    'wheel-of-fortune-online-course-free',
    'spinner-wheel-math-exercise-test',
    'random-picker-music-work-playlist',
    'decision-wheel-spotify-workout-music',
    'wheel-of-fortune-netflix-movie-tonight',
    'spinner-wheel-series-binge-weekend',
    'random-picker-game-friends-home',
    'decision-wheel-activity-rainy-day',
    'wheel-of-fortune-weekend-program-family',
    'spinner-wheel-names-picker-online-free',
    'random-picker-classroom-activities',
    'decision-wheel-important-life-choices'
  ]

  englishOptimizedWheels.forEach(wheel => {
    routes.push({
      url: `${baseUrl}/en/wheel/${wheel}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return routes
}