import { Link } from 'react-router-dom';

const IG_URL = 'https://www.instagram.com/dosyax.tr/';

const links = [
  {
    to: '/indirimler',
    label: 'Güncel indirimler',
    desc: 'Hikayede paylaştığımız fırsatlar',
    external: false,
  },
  {
    to: '/haberler',
    label: 'Teknoloji haberleri',
    desc: 'Kaynağa sadık gündem',
    external: false,
  },
  {
    href: IG_URL,
    label: 'Instagram @dosyax.tr',
    desc: 'Anlık hikaye ve paylaşımlar',
    external: true,
  },
];

/** Instagram bio / link sticker için sade link sayfası */
export default function LinkPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center py-6">
      <div className="mb-8 text-center">
        <img
          src="/dosyax-logo.png"
          alt="DosyaX"
          className="mx-auto h-24 w-24 rounded-full object-cover ring-1 ring-white/20"
        />
        <h1 className="mt-4 font-display text-3xl text-ink">DosyaX</h1>
        <p className="mt-2 text-sm text-ink-soft">Teknoloji haberleri · seçilmiş indirimler</p>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-[#9fd0ff] hover:underline"
        >
          @dosyax.tr
        </a>
      </div>

      <div className="space-y-3">
        {links.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-line bg-panel/70 px-5 py-4 transition hover:border-[#4da3ff]/40 hover:bg-panel"
            >
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              className="block rounded-2xl border border-line bg-panel/70 px-5 py-4 transition hover:border-accent/40 hover:bg-panel"
            >
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
            </Link>
          )
        )}
      </div>

      <p className="mt-8 text-center text-xs text-ink-soft">
        Domain canlı olunca Instagram biyografisine:{' '}
        <span className="text-ink">dosyax.com/link</span>
      </p>
    </div>
  );
}
