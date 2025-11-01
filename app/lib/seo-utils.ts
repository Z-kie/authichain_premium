
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';
const siteName = 'AuthiChain';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
}

export function generateSEOMetadata({
  title = 'AuthiChain - Product NFT Marketplace',
  description = 'Premium product NFT marketplace with AI-powered analytics and authentication',
  keywords = [],
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'AuthiChain Team',
  category = 'Product Technology'
}: SEOProps): Metadata {
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    'product NFT', 'digital asset NFT marketplace', 'product blockchain',
    'item authentication', 'QR code product', 'seed to sale tracking',
    'product analytics', 'weed NFT', 'product art', 'digital asset collectibles'
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${siteName}`
    },
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: type as any,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(category && type === 'article' && { section: category })
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AuthiChain',
      creator: '@AuthiChain',
      title,
      description,
      images: [fullImageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category
  };

  return metadata;
}

// Product-specific SEO metadata generators
export function generateNFTMetadata(nft: {
  name: string;
  description: string;
  price: string;
  item: string;
  genetics: string;
  image: string;
  slug: string;
}) {
  return generateSEOMetadata({
    title: `${nft.name} - Premium Product NFT | ${nft.item}`,
    description: `Own ${nft.name}, a premium product NFT featuring ${nft.item} genetics. ${nft.description} Available for ${nft.price} with verified genetics and lab testing.`,
    keywords: [
      `${nft.item} NFT`,
      `${nft.name} product NFT`,
      'product collectible',
      'digital asset NFT',
      `${nft.genetics} genetics`,
      'verified product NFT'
    ],
    image: nft.image,
    url: `/nft/${nft.slug}`,
    type: 'product',
    category: 'Product NFT'
  });
}

export function generateStrainMetadata(item: {
  name: string;
  description: string;
  genetics: string;
  effects: string[];
  thc: string;
  cbd: string;
  slug: string;
}) {
  return generateSEOMetadata({
    title: `${item.name} Product Strain - Genetics, Effects & NFTs`,
    description: `Discover ${item.name} product item with ${item.genetics} genetics. THC: ${item.thc}, CBD: ${item.cbd}. ${item.description} Available as authenticated NFTs.`,
    keywords: [
      `${item.name} item`,
      `${item.genetics} product`,
      ...item.effects.map(effect => `${effect} product item`),
      `${item.thc} THC item`,
      'product genetics',
      'item information'
    ],
    url: `/items/${item.slug}`,
    type: 'article',
    category: 'Product Strains'
  });
}

// Breadcrumb JSON-LD generator
export function generateBreadcrumbLD(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  };
}

// Product JSON-LD generator for NFTs
export function generateProductLD(nft: {
  name: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  item: string;
  availability: 'InStock' | 'OutOfStock';
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": nft.name,
    "description": nft.description,
    "image": nft.image,
    "brand": {
      "@type": "Brand",
      "name": "AuthiChain"
    },
    "category": "Product NFT",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Product Strain",
        "value": nft.item
      }
    ],
    "offers": {
      "@type": "Offer",
      "price": nft.price.replace(/[^0-9.]/g, ''),
      "priceCurrency": nft.currency,
      "availability": `https://schema.org/${nft.availability}`,
      "seller": {
        "@type": "Organization",
        "name": "AuthiChain"
      }
    }
  };
}

// FAQ JSON-LD generator
export function generateFAQLD(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
