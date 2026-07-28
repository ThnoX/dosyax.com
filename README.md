# DosyaX.com — Kamu sitesi

Premium, sade kamu arayüzü:
- **Haberler** → detay + kaynak + orijinal link
- **Güncel indirimler** → mağaza / kategori / arama → orijinal ürün sayfası
- **Link** → Instagram bio (`/link`)

Veri kaynağı: DosyaX Studio public API (`/api/v1/public/...`)

## Yerel çalıştırma

1. Studio API ayakta olsun (`http://localhost:4000`)
2. Bu klasörde:

```bash
npm install
npm run dev
```

Site: http://localhost:5174

API adresi `.env` (yerel) / `.env.production` (build):

```
VITE_API_BASE=http://localhost:4000/api/v1
```

Canlıda Hostinger env veya `.env.production`:

```
VITE_API_BASE=https://oto.dosyax.com/api/v1
```

## Domain

| Domain | Ne |
|--------|----|
| `dosyax.com` | Bu kamu sitesi |
| `oto.dosyax.com` | DosyaX Studio (otomasyon paneli) |

Instagram bio (canlı): `https://dosyax.com/link`  
Profil adımları: `INSTAGRAM_PROFIL.md`  
Hostinger Git deploy: `HOSTINGER.md`

## Build

```bash
npm run build
```

Çıktı: `dist/` (SPA; `public/.htaccess` ve `_redirects` kopyalanır).
