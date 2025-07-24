import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/internal/', '/_next/', '/admin/'],
    },
    sitemap: 'https://wheelmaker.app/sitemap.xml',
  };
}