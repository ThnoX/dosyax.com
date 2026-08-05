const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1').replace(
  /\/$/,
  ''
);

function buildPayload(eventType, payload = {}) {
  return {
    event_type: eventType,
    path:
      payload.path ||
      (typeof window !== 'undefined' ? window.location.pathname + (window.location.search || '') : null),
    referrer:
      payload.referrer ||
      (typeof document !== 'undefined' ? document.referrer || null : null),
    user_agent:
      payload.user_agent ||
      (typeof navigator !== 'undefined' ? navigator.userAgent : null),
    entity_id: payload.entity_id || payload.id || null,
    entity_title: payload.entity_title || payload.title || null,
    target_url: payload.target_url || payload.href || null,
    meta: payload.meta && typeof payload.meta === 'object' ? payload.meta : {},
  };
}

function pixelTrack(data) {
  try {
    const qs = new URLSearchParams();
    qs.set('event_type', data.event_type);
    if (data.path) qs.set('path', String(data.path).slice(0, 400));
    if (data.entity_id) qs.set('entity_id', String(data.entity_id).slice(0, 120));
    if (data.entity_title) qs.set('entity_title', String(data.entity_title).slice(0, 200));
    if (data.target_url) qs.set('target_url', String(data.target_url).slice(0, 800));
    if (data.referrer) qs.set('referrer', String(data.referrer).slice(0, 300));
    if (data.meta && Object.keys(data.meta).length) {
      qs.set('meta', JSON.stringify(data.meta).slice(0, 400));
    }
    const img = new Image();
    img.referrerPolicy = 'no-referrer-when-downgrade';
    img.src = `${API_BASE}/public/track?${qs.toString()}&_=${Date.now()}`;
  } catch {
    /* ignore */
  }
}

function fetchTrack(data) {
  try {
    const body = JSON.stringify(data);
    // text/plain = CORS preflight yok (basit istek) — sendBeacon/fetch güvenilir
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
      navigator.sendBeacon(`${API_BASE}/public/track`, blob);
    }
    fetch(`${API_BASE}/public/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8', Accept: 'application/json' },
      body,
      keepalive: true,
      mode: 'cors',
      credentials: 'omit',
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

/** Fire-and-forget site analytics (dosyax.com → oto API) */
export function trackSiteEvent(eventType, payload = {}) {
  try {
    const data = buildPayload(eventType, payload);
    // 1) GET pixel — CORS’suz, en güvenilir
    pixelTrack(data);
    // 2) POST yedek
    fetchTrack(data);
  } catch {
    /* ignore */
  }
}
