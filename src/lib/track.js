const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1').replace(
  /\/$/,
  ''
);

/** Fire-and-forget site analytics (dosyax.com → oto API) */
export function trackSiteEvent(eventType, payload = {}) {
  try {
    const body = JSON.stringify({
      event_type: eventType,
      path: typeof window !== 'undefined' ? window.location.pathname : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      ...payload,
    });
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      const ok = navigator.sendBeacon(`${API_BASE}/public/track`, blob);
      if (ok) return;
    }
    fetch(`${API_BASE}/public/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
      keepalive: true,
      mode: 'cors',
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}
