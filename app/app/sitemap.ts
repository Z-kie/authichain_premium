
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';
  const currentDate = new Date().toISOString();

  // Static pages with high priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scanner`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }
  ];

  // Dynamic NFT pages (you would typically fetch these from your database)
  const nftPages = [
    'bud-master-supreme',
    'myles-high-001',
    'green-goddess-divine',
    'chronic-commander',
    'purple-haze-legend',
    'og-kush-king'
  ].map(slug => ({
    url: `${baseUrl}/nft/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Product item pages
  const itemPages = [
    'og-kush',
    'purple-haze',
    'blue-dream',
    'white-widow',
    'ak-47',
    'northern-lights'
  ].map(item => ({
    url: `${baseUrl}/items/${item}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Category pages
  const categoryPages = [
    'indica',
    'sativa', 
    'hybrid',
    'cbd',
    'rare-items',
    'premium-collections'
  ].map(category => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...nftPages,
    ...itemPages,
    ...categoryPages
  ];
}
