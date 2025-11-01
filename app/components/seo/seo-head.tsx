
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function SEOHead({ title, description, image, noIndex }: SEOHeadProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamically update page title for SPA navigation
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';
      canonical.setAttribute('href', `${baseUrl}${pathname}`);
    }

    // Add robots meta for noIndex pages
    if (noIndex) {
      const existingRobots = document.querySelector('meta[name="robots"]');
      if (existingRobots) {
        existingRobots.setAttribute('content', 'noindex, nofollow');
      } else {
        const robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'noindex, nofollow';
        document.head.appendChild(robotsMeta);
      }
    }

    // Update Open Graph image
    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';
        const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
        ogImage.setAttribute('content', fullImageUrl);
      }
    }

    // Track page view for analytics
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: title || document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }

    // Product age verification tracking
    if (pathname.includes('/marketplace') || pathname.includes('/nft/')) {
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'product_content_view', {
          content_type: 'product_nft',
          age_verified: true,
          region: 'US'
        });
      }
    }
  }, [pathname, title, description, image, noIndex]);

  return null;
}
