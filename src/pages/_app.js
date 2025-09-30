import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';
import '@/styles/fonts.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Handle route changes for analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Track page views with your analytics tool
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };

    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe from the event
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
            <meta property="og:site_name" content="NewsFlow" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@newsflow" />
            
            {/* PWA */}
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="theme-color" content="#ffffff" />
            
            {/* Preload critical assets */}
            <link rel="preload" as="style" href="/styles/globals.css" />
            <link rel="preload" as="style" href="/styles/fonts.css" />
          </Head>
          
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
          
          {/* Analytics */}
          <Analytics />
          <SpeedInsights />
          
          {/* Global site tag (gtag.js) - Google Analytics */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
          
          {/* Facebook Pixel Code */}
          {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
          )}
    </ThemeProvider>
  );
}

export default MyApp;
