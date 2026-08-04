import { Link } from 'react-router-dom';
import { formatDate } from '../lib/api';

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6 max-w-2xl min-w-0 sm:mb-8">
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
    <div className="rounded-2xl border border-dashed border-line bg-panel/40 px-4 py-12 text-center text-ink-soft sm:px-6 sm:py-16">
      {children}
    </div>
  );
}

export function NewsCard({ item }) {
  return (
    <Link
      to={`/haberler/${item.id}`}
      className="group grid min-w-0 overflow-hidden rounded-xl border border-line bg-panel/60 transition hover:border-accent/35 hover:bg-panel sm:rounded-2xl"
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
          className={`grid h-full place-items-center text-xs text-ink-soft sm:text-sm ${
            item.image_url ? 'hidden' : ''
          }`}
        >
          Görsel yok
        </div>
      </div>
      <div className="min-w-0 space-y-1 p-2.5 sm:space-y-2 sm:p-5">
        <p className="truncate text-[10px] uppercase tracking-wide text-accent sm:text-xs">
          {item.source_name}
        </p>
        <h3 className="font-display text-[13px] leading-snug break-words text-ink group-hover:text-accent sm:text-xl">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="line-clamp-2 hidden text-sm leading-relaxed text-ink-soft sm:block">
            {item.summary}
          </p>
        ) : null}
        <p className="text-[10px] text-ink-soft sm:text-xs">{formatDate(item.published_at)}</p>
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
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-panel/60 transition hover:border-accent/35 sm:rounded-2xl"
    >
      <div className="flex h-[7.25rem] items-center justify-center bg-panel-2 sm:h-[11rem]">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt=""
            className="max-h-full max-w-full object-contain p-2 sm:p-3"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="grid h-full place-items-center text-xs text-ink-soft sm:text-sm">Görsel yok</div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 p-2.5 sm:gap-1.5 sm:p-3.5">
        <p className="truncate text-[10px] text-accent sm:text-xs">{item.store_label}</p>
        <h3 className="line-clamp-2 text-[12px] font-medium leading-snug break-words text-ink group-hover:text-accent sm:text-sm">
          {item.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-end gap-x-1.5 gap-y-0.5 pt-1">
          <span className="font-display text-[15px] leading-none text-ink sm:text-xl">
            {Number(item.price).toLocaleString('tr-TR')}
            <span className="ml-0.5 text-[10px] font-sans font-medium text-ink-soft sm:text-xs">
              TL
            </span>
          </span>
          {item.list_price > item.price ? (
            <span className="text-[10px] text-ink-soft line-through sm:text-sm">
              {Number(item.list_price).toLocaleString('tr-TR')} TL
            </span>
          ) : null}
          {item.discount_pct ? (
            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent sm:rounded-md sm:text-xs">
              %{item.discount_pct}
            </span>
          ) : null}
        </div>
        <p className="hidden text-xs font-medium text-accent-2 sm:block">Satın alma sayfasına git →</p>
      </div>
    </a>
  );
}
