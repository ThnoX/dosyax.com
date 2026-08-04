import { NavLink, Outlet, Link } from 'react-router-dom';

const IG_URL = 'https://www.instagram.com/dosyax.tr/';

const links = [
  { to: '/', label: 'Ana Sayfa', short: 'Ana', end: true },
  { to: '/haberler', label: 'Haberler', short: 'Haber' },
  { to: '/indirimler', label: 'Güncel İndirimler', short: 'İndirim' },
];

export default function Shell() {
  return (
    <div className="dx-grain min-h-screen pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-[#0b1017]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#0b1017]/75">
        <div className="mx-auto max-w-6xl px-3 pt-[max(0.65rem,env(safe-area-inset-top))] sm:px-6">
          {/* Üst sıra: marka + IG */}
          <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
            <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
              <img
                src="/dosyax-logo.png"
                alt="DosyaX"
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/15 transition group-hover:ring-[#4da3ff]/50 sm:h-11 sm:w-11"
              />
              <div className="min-w-0">
                <div className="font-display text-xl leading-none tracking-tight text-ink sm:text-2xl">
                  DosyaX
                </div>
                <div className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-soft sm:mt-1 sm:block">
                  Tech & Deals
                </div>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {/* Desktop nav */}
              <nav className="hidden items-center gap-1 md:flex md:gap-2" aria-label="Ana menü">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-white/10 text-ink'
                          : 'text-ink-soft hover:bg-white/5 hover:text-ink'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#4da3ff]/35 bg-[#4da3ff]/10 p-2.5 text-[#9fd0ff] transition hover:bg-[#4da3ff]/20 sm:gap-2 sm:px-3 sm:py-2"
                aria-label="Instagram'da takip et"
              >
                <IgIcon className="h-4 w-4" />
                <span className="hidden text-sm font-medium sm:inline">@dosyax.tr</span>
              </a>
            </div>
          </div>

          {/* Mobil nav — tam genişlik, kaymaz */}
          <nav
            className="grid grid-cols-3 gap-1 border-t border-line/40 pb-2 pt-2 md:hidden"
            aria-label="Mobil menü"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-xl px-1 py-2.5 text-center text-[13px] font-medium transition ${
                    isActive
                      ? 'bg-white/10 text-ink'
                      : 'text-ink-soft hover:bg-white/5 hover:text-ink'
                  }`
                }
              >
                {l.short}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-3 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <img
              src="/dosyax-logo.png"
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/10"
            />
            <p className="min-w-0 text-sm leading-relaxed text-ink-soft">
              <span className="font-display text-ink">DosyaX</span> — teknoloji haberleri ve seçilmiş
              indirimler.
            </p>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9fd0ff] hover:underline"
          >
            <IgIcon className="h-4 w-4 shrink-0" />
            <span className="break-words">Instagram’da takip et → @dosyax.tr</span>
          </a>
        </div>
      </footer>
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
