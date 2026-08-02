const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1').replace(
  /\/$/,
  ''
);

export async function publicApi(path, { timeoutMs = 12000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}/public${path}`, {
      headers: { Accept: 'application/json' },
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || data.message || `İstek başarısız (${res.status})`);
    }
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw new Error('Sunucu yanıt vermedi — sayfayı yenile');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export function formatTl(n) {
  if (n == null || !Number.isFinite(Number(n))) return '—';
  return `${Number(n).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL`;
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}
