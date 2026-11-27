import Script from "next/script";

import { GTM_ID } from "@/lib/gtm";

/**
 * Installs Google Tag Manager exactly once (rendered from app/layout.tsx).
 *
 * - dataLayer is created only if missing, so any existing layer is preserved.
 * - Consent Mode defaults to "denied" BEFORE gtm.js loads. The site has no
 *   cookie banner yet; until one calls
 *     gtag('consent', 'update', { analytics_storage: 'granted' })
 *   GA4 tags that honour consent will not set cookies. See SEO-GTM-IMPLEMENTATION.md.
 * - gtm.start is pushed so GTM's "Container Loaded / Page View" triggers fire.
 *
 * Single-page navigation: this component deliberately does NOT push page_view
 * events. Configure ONE approach in GTM (History Change trigger, or GA4
 * enhanced measurement) to avoid double counting.
 */
export default function GoogleTagManager() {
  const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
  analytics_storage:'denied',wait_for_update:500
});
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
`;

  return (
    <>
      <Script id="gtm-bootstrap" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
    </>
  );
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
