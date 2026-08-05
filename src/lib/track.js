const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1').replace(
  /\/$/,
  ''
);

/** Aynı tıklamada çift kayıt engeli (client) */
const recentKeys = new Map();
function shouldSkip(key) {
  const now = Date.now();
  for (const [k, t] of recentKeys) {
    if (now - t > 8000) recentKeys.delete(k);
  }
  if (recentKeys.has(key) && now - recentKeys.get(key) < 4000) return true;
  recentKeys.set(key, now);
  return false;
}

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

/** Tek istek — GET pixel (CORS’suz, çift yazım yok) */
function pixelTrack(data) {
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
  const img = new Image(1, 1);
  img.referrerPolicy = 'no-referrer-when-downgrade';
  img.src = `${API_BASE}/public/track?${qs.toString()}`;
}

/** Fire-and-forget — tek kayıt */
export function trackSiteEvent(eventType, payload = {}) {
  try {
    const data = buildPayload(eventType, payload);
    const key = [
      data.event_type,
      data.entity_id || '',
      data.path || '',
      data.target_url || '',
    ].join('|');
    if (shouldSkip(key)) return;
    pixelTrack(data);
  } catch {
    /* ignore */
  }
}
