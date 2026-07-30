import { useEffect, useState } from 'react';
import { publicApi } from '../lib/api';
import { EmptyState, NewsCard, SectionTitle } from '../components/ui';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function load(keyword = q) {
    setBusy(true);
    setError('');
    try {
      const qs = new URLSearchParams();
      qs.set('limit', '500');
      if (String(keyword || '').trim()) qs.set('q', String(keyword).trim());
      const data = await publicApi(`/news?${qs.toString()}`);
      setNews(data.news || []);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load('');
  }, []);

  return (
    <div>
      <SectionTitle
        eyebrow="Haberler"
        title="Teknoloji gündemi"
        subtitle="Kaynağından alınan haberler. Detayda metin, görsel ve orijinal bağlantı birlikte görünür."
      />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          className="min-w-0 flex-1 rounded-xl border border-line bg-panel px-4 py-3 text-sm outline-none ring-accent/40 placeholder:text-ink-soft focus:ring-2"
          placeholder="Haberde ara…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && load()}
        />
        <button
          type="button"
          onClick={() => load()}
          disabled={busy}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-[#1a1408] disabled:opacity-60"
        >
          {busy ? 'Aranıyor…' : 'Ara'}
        </button>
      </div>

      {error ? <p className="mb-4 text-sm text-danger">{error}</p> : null}

      {!news.length ? (
        <EmptyState>Haber bulunamadı.</EmptyState>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
