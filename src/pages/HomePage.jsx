import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../lib/api';
import { DealCard, EmptyState, NewsCard } from '../components/ui';

const IG_URL = 'https://www.instagram.com/dosyax.tr/';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    // Ayrı ayrı yükle — biri yavaş/timeout olursa diğeri boşa düşmesin
    publicApi('/news?limit=12', { timeoutMs: 10000 })
      .then((n) => {
        if (!cancelled) setNews(n.news || []);
      })
      .catch((e) => {
        if (!cancelled) setError((prev) => prev || e.message);
      });
    publicApi('/deals?limit=6', { timeoutMs: 10000 })
      .then((d) => {
        if (!cancelled) setDeals(d.deals || []);
      })
      .catch((e) => {
        if (!cancelled) setError((prev) => prev || e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <section className="relative mb-10 overflow-hidden rounded-2xl border border-line bg-panel/60 sm:mb-12 sm:rounded-[1.75rem]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 88% 20%, rgba(77,163,255,0.18), transparent 55%), radial-gradient(ellipse 50% 60% at 10% 90%, rgba(212,175,99,0.12), transparent 50%)',
          }}
        />
        <div className="relative grid items-center gap-6 px-4 py-7 sm:grid-cols-[1.15fr_0.85fr] sm:gap-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            <img
              src="/dosyax-logo.png"
              alt="DosyaX"
              className="anim-rise h-14 w-14 rounded-full object-cover ring-1 ring-white/20 sm:h-20 sm:w-20"
            />
            <h1 className="anim-rise-delay max-w-xl font-display text-[1.85rem] leading-[1.08] break-words text-ink sm:text-5xl sm:leading-[1.02] lg:text-[3.4rem]">
              Teknoloji haberleri ve seçilmiş indirimler.
            </h1>
            <p className="anim-rise-delay-2 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
              Kaynağa sadık haberler. Hikayede paylaştığımız güncel fırsatlar. Sade, hızlı, net.
            </p>
            <div className="anim-rise-delay-2 flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                to="/haberler"
                className="rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-[#1a1408] transition hover:brightness-110"
              >
                Haberlere bak
              </Link>
              <Link
                to="/indirimler"
                className="rounded-full border border-line bg-white/5 px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-white/10"
              >
                Güncel indirimler
              </Link>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4da3ff]/40 bg-[#4da3ff]/12 px-5 py-3 text-sm font-semibold text-[#b7dcff] transition hover:bg-[#4da3ff]/20"
              >
                <IgIcon className="h-4 w-4 shrink-0" />
                Instagram’da takip et
              </a>
            </div>
          </div>

          <div className="anim-rise-delay relative hidden overflow-hidden justify-self-end sm:block">
            <div className="absolute inset-0 rounded-full bg-[#4da3ff]/10 blur-2xl" />
            <img
              src="/dosyax-logo.png"
              alt=""
              className="relative h-52 w-52 rounded-full object-cover ring-1 ring-white/15 lg:h-64 lg:w-64"
            />
          </div>
        </div>
      </section>

      <section className="mb-10 overflow-hidden rounded-2xl border border-[#4da3ff]/25 bg-gradient-to-r from-[#4da3ff]/10 via-panel/40 to-transparent px-4 py-4 sm:mb-12 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7eb8ff]">
              Instagram
            </p>
            <p className="mt-1 font-display text-lg break-words text-ink sm:text-xl">
              Güncel haber ve indirimler @dosyax.tr
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Hikaye ve post’ları kaçırmamak için hesabı takip et.
            </p>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#4da3ff] px-5 py-3 text-sm font-semibold text-[#071018] transition hover:brightness-110 sm:w-auto"
          >
            <IgIcon className="h-4 w-4" />
            Takip et
          </a>
        </div>
      </section>

      {error ? <p className="mb-6 text-sm text-danger">{error}</p> : null}

      <section className="mb-12 sm:mb-14">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6 sm:gap-4">
          <h2 className="min-w-0 font-display text-2xl text-ink sm:text-3xl">Son haberler</h2>
          <Link to="/haberler" className="shrink-0 text-sm text-accent hover:underline">
            Tümü →
          </Link>
        </div>
        {!news.length ? (
          <EmptyState>Henüz yayınlanacak haber yok.</EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6 sm:gap-4">
          <h2 className="min-w-0 font-display text-2xl text-ink sm:text-3xl">Güncel indirimler</h2>
          <Link to="/indirimler" className="shrink-0 text-sm text-accent hover:underline">
            Tümü →
          </Link>
        </div>
        {!deals.length ? (
          <EmptyState>Henüz paylaşılan indirim yok.</EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function IgIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.75 6.2a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" />
    </svg>
  );
}
