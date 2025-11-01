
'use client';

export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AuthiChain",
    "alternateName": "AuthiChain Product NFT Marketplace",
    "description": "The world's premier product NFT marketplace featuring AI-powered item authentication, QR code scanning, and comprehensive business analytics.",
    "url": "https://authichain.app",
    "logo": "https://as1.ftcdn.net/jpg/05/01/36/50/1000_F_501365054_Ud0cOaQFODU4tz69b6uPEEe6KKFhPVuT.jpg",
    "image": "https://productnow.com/wp-content/uploads/2021/04/Sour-Diesel-731x1024.jpg",
    "sameAs": [
      "https://twitter.com/AuthiChain",
      "https://github.com/authichain",
      "https://linkedin.com/company/authichain"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-888-STRAIN-1",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["en", "es"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "CA"
    },
    "foundingDate": "2024",
    "numberOfEmployees": "10-50",
    "industry": "Product Technology"
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AuthiChain",
    "url": "https://authichain.app",
    "description": "Premium product NFT marketplace with AI-powered analytics and authentication",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://authichain.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AuthiChain",
      "logo": "https://upload.wikimedia.org/wikipedia/commons/8/81/HersheyCo.svg"
    }
  };

  const softwareApplicationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AuthiChain",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "description": "Product NFT marketplace and analytics platform with AI-powered item authentication",
    "url": "https://authichain.app",
    "screenshot": "https://pbs.twimg.com/media/Gz9MhKiXEAAuSSF.jpg",
    "softwareVersion": "1.0",
    "datePublished": "2024-09-14",
    "author": {
      "@type": "Organization",
      "name": "AuthiChain"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Plan",
        "description": "Free access to basic NFT marketplace features",
        "price": "0",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "description": "Advanced analytics and premium features",
        "price": "29",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Brand Plan",
        "description": "Enterprise-grade product business solutions",
        "price": "99",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "priceValidUntil": "2025-12-31"
      }
    ],
    "featureList": [
      "Product NFT Marketplace",
      "AI-Powered Strain Authentication",
      "QR Code Scanning",
      "Seed-to-Sale Tracking",
      "Business Analytics",
      "Stripe Payment Integration",
      "Cryptocurrency Support",
      "Mobile PWA Application"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://authichain.app"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
