
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/error',
          '/auth/verify-request',
          '/private/',
          '/_next/',
          '/static/',
          '*.json$',
          '/search?*',
          '/checkout/',
          '/payment/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/marketplace',
          '/nft/',
          '/items/',
          '/category/',
          '/about',
          '/pricing'
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/',
          '/private/',
          '/checkout/',
          '/payment/',
        ],
      },
      {
        userAgent: 'Google-Extended',
        allow: [
          '/',
          '/marketplace',
          '/nft/',
          '/items/',
          '/about'
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/',
          '/scanner/',
          '/analytics/'
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
