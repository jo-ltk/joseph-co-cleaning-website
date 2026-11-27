/**
 * Google Tag Manager helpers.
 *
 * The container is installed once in app/layout.tsx via <GoogleTagManager />.
 * Everything that pushes to the dataLayer goes through pushDataLayerEvent so
 * event names/params stay consistent and never contain personal data.
 */

export const GTM_ID = "GTM-T59Q4PQL";

export type DataLayerEvent =
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "contact_form_success"
  | "care_application_success";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Push a custom event. Safe to call during SSR (no-op).
 * NEVER pass names, emails, phone numbers or free-text form content as params.
 */
export function pushDataLayerEvent(event: DataLayerEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Push a conversion event and then run `callback`, but never wait more than
 * `maxWaitMs`. Used where the page is about to navigate away (the booking form
 * redirects to WhatsApp), so the hit has a chance to leave before unload.
 */
export function pushDataLayerEventThen(
  event: DataLayerEvent,
  params: EventParams,
  callback: () => void,
  maxWaitMs = 250,
) {
  if (typeof window === "undefined") {
    callback();
    return;
  }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    callback();
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, eventCallback: finish, eventTimeout: maxWaitMs });
  window.setTimeout(finish, maxWaitMs);
}
