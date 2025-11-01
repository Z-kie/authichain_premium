
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      
      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });

      window.gtag = gtag;
    }

    // Facebook Pixel
    if (process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
      const fbPixel = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      const script = document.createElement('script');
      script.innerHTML = fbPixel;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    }

    // Microsoft Clarity (Optional)
    if (process.env.NEXT_PUBLIC_CLARITY_ID) {
      const clarityScript = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
      `;
      const script = document.createElement('script');
      script.innerHTML = clarityScript;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }

    // Track product-specific events
    if (pathname.includes('/nft/')) {
      trackEvent('nft_page_view', {
        page_path: pathname,
        content_type: 'product_nft'
      });
    } else if (pathname.includes('/scanner/')) {
      trackEvent('qr_scanner_access', {
        page_path: pathname,
        feature: 'product_authentication'
      });
    } else if (pathname.includes('/pricing')) {
      trackEvent('pricing_page_view', {
        page_path: pathname,
        content_type: 'subscription_plans'
      });
    }
  }, [pathname]);

  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        custom_map: { product_platform: 'authichain' },
        ...parameters
      });
    }

    // Facebook Pixel events
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'CustomEvent', {
        event_name: eventName,
        platform: 'authichain',
        ...parameters
      });
    }
  };

  return null;
}

// Export function for manual event tracking
export const trackCustomEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        product_platform: 'authichain',
        ...parameters
      });
    }

    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'CustomEvent', {
        event_name: eventName,
        platform: 'authichain',
        ...parameters
      });
    }
  }
};
