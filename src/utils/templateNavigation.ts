import { WheelTemplate } from '@/data/templates';
import { WHEEL_ROUTES } from '@/generated-pages/routes';

/**
 * Gera uma URL amigável para um template
 */
export function generateTemplateSlug(template: WheelTemplate): string {
  // Normalizar o título para criar um slug
  const baseSlug = template.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
  
  return `${template.category}-${baseSlug}-${template.id}`;
}

/**
 * Encontra a rota correspondente para um template
 */
export function findTemplateRoute(template: WheelTemplate): string | null {
  // Primeiro, tenta encontrar uma rota exata baseada no ID do template
  const exactRoute = WHEEL_ROUTES.find(route => {
    return route.title.includes(template.title) || 
           route.slug.includes(template.id) ||
           route.category === template.category;
  });
  
  if (exactRoute) {
    return `/wheel/${exactRoute.slug}`;
  }
  
  // Se não encontrar uma rota exata, tenta encontrar uma similar
  const similarRoute = WHEEL_ROUTES.find(route => {
    const routeWords = route.title.toLowerCase().split(' ');
    const templateWords = template.title.toLowerCase().split(' ');
    
    // Verifica se pelo menos 50% das palavras coincidem
    const matchingWords = templateWords.filter(word => 
      routeWords.some(routeWord => routeWord.includes(word) || word.includes(routeWord))
    );
    
    return matchingWords.length >= Math.ceil(templateWords.length * 0.5);
  });
  
  if (similarRoute) {
    return `/wheel/${similarRoute.slug}`;
  }
  
  // Se não encontrar nenhuma rota, retorna null
  return null;
}

/**
 * Navega para a página do template
 */
export function navigateToTemplate(template: WheelTemplate): void {
  const route = findTemplateRoute(template);
  
  if (route) {
    // Usar window.location para navegação
    window.location.href = route;
  } else {
    console.warn(`Rota não encontrada para o template: ${template.title}`);
    // Fallback: redirecionar para a página principal com o template carregado
    const params = new URLSearchParams({
      template: template.id,
      category: template.category
    });
    window.location.href = `/?${params.toString()}`;
  }
}

/**
 * Verifica se um template tem uma página SEO correspondente
 */
export function hasTemplatePage(template: WheelTemplate): boolean {
  return findTemplateRoute(template) !== null;
}

/**
 * Obtém a URL completa para um template
 */
export function getTemplateUrl(template: WheelTemplate, baseUrl: string = 'https://wheelgenerator.com'): string {
  const route = findTemplateRoute(template);
  return route ? `${baseUrl}${route}` : `${baseUrl}/?template=${template.id}`;
}