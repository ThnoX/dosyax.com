import { Link } from 'react-router-dom';
import { formatDate } from '../lib/api';

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6 max-w-2xl sm:mb-8">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      ) : null}
      <h1 className="font-display text-3xl leading-tight break-words text-ink sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function EmptyState({ children }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-panel/40 px-6 py-16 text-center text-ink-soft">
      {children}
    </div>
  );
}

export function NewsCard({ item }) {
  return (
    <Link
      to={`/haberler/${item.id}`}
      className="group grid min-w-0 overflow-hidden rounded-2xl border border-line bg-panel/60 transition hover:border-accent/35 hover:bg-panel"
    >
      <div className="aspect-[16/10] overflow-hidden bg-panel-2">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = 'none';
              const fallback = el.parentElement?.querySelector('[data-news-fallback]');
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
        ) : null}
        <div
          data-news-fallback
          className={`grid h-full place-items-center text-sm text-ink-soft ${
            item.image_url ? 'hidden' : ''
          }`}
        >
          Görsel yok
        </div>
      </div>
      <div className="min-w-0 space-y-2 p-4 sm:p-5">
        <p className="truncate text-xs uppercase tracking-wide text-accent">{item.source_name}</p>
        <h3 className="font-display text-lg leading-snug break-words text-ink group-hover:text-accent sm:text-xl">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{item.summary}</p>
        ) : null}
        <p className="text-xs text-ink-soft">{formatDate(item.published_at)}</p>
      </div>
    </Link>
  );
}

export function DealCard({ item }) {
  return (
    <a
      href={item.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 transition hover:border-accent/35"
    >
      <div className="aspect-[4/3] bg-panel-2">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt=""
            className="h-full w-full object-contain p-3 sm:p-4"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-ink-soft">Görsel yok</div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col space-y-2 p-3.5 sm:p-4">
        <p className="truncate text-xs text-accent">{item.store_label}</p>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug break-words text-ink group-hover:text-accent">
          {item.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="font-display text-xl text-ink sm:text-2xl">
            {Number(item.price).toLocaleString('tr-TR')} TL
          </span>
          {item.list_price > item.price ? (
            <span className="text-sm text-ink-soft line-through">
              {Number(item.list_price).toLocaleString('tr-TR')} TL
            </span>
          ) : null}
          {item.discount_pct ? (
            <span className="rounded-md bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
              %{item.discount_pct}
            </span>
          ) : null}
        </div>
        <p className="text-xs font-medium text-accent-2">Satın alma sayfasına git →</p>
      </div>
    </a>
  );
}
