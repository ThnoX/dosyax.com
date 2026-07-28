import { useEffect, useMemo, useState } from 'react';
import { publicApi } from '../lib/api';
import { DealCard, EmptyState, SectionTitle } from '../components/ui';

export default function DealsPage() {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function loadDeals({
    selectedStore = storeId,
    selectedCategory = category,
    keyword = q,
  } = {}) {
    const qs = new URLSearchParams();
    qs.set('limit', '72');
    if (selectedStore) qs.set('store_id', selectedStore);
    if (selectedCategory) qs.set('category', selectedCategory);
    if (String(keyword || '').trim()) qs.set('q', String(keyword).trim());
    const data = await publicApi(`/deals?${qs.toString()}`);
    setDeals(data.deals || []);
    if (data.categories?.length) setCategories(data.categories);
  }

  useEffect(() => {
    setBusy(true);
    Promise.all([publicApi('/stores'), publicApi('/categories'), loadDeals({ selectedStore: '', selectedCategory: '', keyword: '' })])
      .then(([s, c]) => {
        setStores(s.stores || []);
        setCategories(c.categories || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setBusy(false));
  }, []);

  async function applyFilters(next = {}) {
    const selectedStore = next.storeId ?? storeId;
    const selectedCategory = next.category ?? category;
    const keyword = next.q ?? q;
    if (next.storeId !== undefined) setStoreId(next.storeId);
    if (next.category !== undefined) setCategory(next.category);
    if (next.q !== undefined) setQ(next.q);
    setBusy(true);
    setError('');
    try {
      await loadDeals({ selectedStore, selectedCategory, keyword });
    } catch (err) {
      setError(err.message);
      setDeals([]);
    } finally {
      setBusy(false);
    }
  }

  const storeButtons = useMemo(
    () => [{ id: '', label: 'Tümü' }, ...stores],
    [stores]
  );

  return (
    <div>
      <SectionTitle
        eyebrow="Fırsatlar"
        title="Güncel indirimler"
        subtitle="Instagram hikayelerinde paylaştığımız ürünler. Tıklayınca orijinal mağaza sayfasına gidersin."
      />

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Mağazalar
            </p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {storeButtons.map((s) => {
                const active = storeId === s.id;
                return (
                  <button
                    key={s.id || 'all'}
                    type="button"
                    onClick={() => applyFilters({ storeId: s.id })}
                    className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                      active
                        ? 'bg-accent/15 font-semibold text-accent'
                        : 'text-ink-soft hover:bg-white/5 hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Kategori
            </p>
            <select
              className="w-full rounded-xl border border-line bg-panel px-3 py-2.5 text-sm"
              value={category}
              onChange={(e) => applyFilters({ category: e.target.value })}
            >
              <option value="">Tüm kategoriler</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="min-w-0 flex-1 rounded-xl border border-line bg-panel px-4 py-3 text-sm outline-none ring-accent/40 placeholder:text-ink-soft focus:ring-2"
              placeholder="Ürün ara… (ör. mouse, SSD)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters({ q })}
            />
            <button
              type="button"
              onClick={() => applyFilters({ q })}
              disabled={busy}
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-[#1a1408] disabled:opacity-60"
            >
              {busy ? 'Aranıyor…' : 'Ara'}
            </button>
          </div>

          {error ? <p className="mb-4 text-sm text-danger">{error}</p> : null}

          {!deals.length ? (
            <EmptyState>
              {busy ? 'Yükleniyor…' : 'Bu filtrede indirim yok. Mağaza veya kategoriyi değiştir.'}
            </EmptyState>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {deals.map((item) => (
                <DealCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
