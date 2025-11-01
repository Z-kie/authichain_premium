
'use client';

interface PageSchemaProps {
  type: 'website' | 'marketplace' | 'product' | 'article';
  data: any;
}

export function PageSchema({ type, data }: PageSchemaProps) {
  let schema = {};

  switch (type) {
    case 'website':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AuthiChain",
        "url": "https://authichain.app",
        "description": "Premium product NFT marketplace with AI-powered analytics",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://authichain.app/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      };
      break;
    
    case 'marketplace':
      schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Product NFT Marketplace",
        "description": "Premium product NFT collection with authenticated items",
        "url": "https://authichain.app/marketplace",
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": data.itemCount || 100,
          "itemListElement": data.items?.map((item: any, index: number) => ({
            "@type": "Product",
            "position": index + 1,
            "name": item.name,
            "description": item.description,
            "image": item.image,
            "offers": {
              "@type": "Offer",
              "price": item.price,
              "priceCurrency": item.currency || "ETH"
            }
          })) || []
        }
      };
      break;
    
    case 'product':
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "description": data.description,
        "image": data.image,
        "category": "Product NFT",
        "brand": {
          "@type": "Brand",
          "name": "AuthiChain"
        },
        "offers": {
          "@type": "Offer",
          "price": data.price,
          "priceCurrency": data.currency || "ETH",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "AuthiChain"
          }
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Product Strain",
            "value": data.item
          },
          {
            "@type": "PropertyValue",
            "name": "Genetics",
            "value": data.genetics
          }
        ]
      };
      break;
    
    case 'article':
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.description,
        "image": data.image,
        "author": {
          "@type": "Organization",
          "name": "AuthiChain"
        },
        "publisher": {
          "@type": "Organization",
          "name": "AuthiChain",
          "logo": {
            "@type": "ImageObject",
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Chainlink_Logo.png/250px-Chainlink_Logo.png"
          }
        },
        "datePublished": data.publishedDate,
        "dateModified": data.modifiedDate || data.publishedDate,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.url
        }
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
