# Hostinger — dosyax.com GitHub deploy

Vite + React sitesi. Hostinger’da **Node.js Web App** + GitHub en temiz yol.

## Önkoşul

1. Bu repo GitHub’da (aşağıdaki adımlar veya `gh repo create`)
2. Hostinger’da Business / Cloud (Node.js Web App destekleyen) plan
3. Domain `dosyax.com` Hostinger’da veya DNS Hostinger’a yönlü
4. Veri için Studio API canlı olmalı: `https://oto.dosyax.com/api/v1`  
   (henüz yoksa geçici API URL’ini Hostinger env’e yaz)

## 1) GitHub

Repo örneği: `https://github.com/<kullanici>/dosyax.com`

Branch: `main`

## 2) Hostinger hPanel

1. **Websites → Add website → Node.js Web App**
2. **Import Git Repository** → GitHub’ı yetkilendir
3. Repo: `dosyax.com` · Branch: `main`
4. Build ayarları (otomatik gelmezse):

| Ayar | Değer |
|------|--------|
| Framework | Vite / React |
| Node.js | 20 (veya 22) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

5. **Environment variables**:

```
VITE_API_BASE=https://oto.dosyax.com/api/v1
```

> `VITE_*` değişkenleri **build sırasında** gömülür. API adresini değiştirirsen yeniden deploy et.

6. **Deploy**

7. Domain bağla: `dosyax.com` (+ `www` yönlendirmesi)

## 3) SPA rotaları

`public/.htaccess` ve `public/_redirects` build ile `dist/` içine kopyalanır.  
`/haberler`, `/indirimler`, `/link` yenilemede 404 olursa Hostinger destekten SPA fallback / rewrite iste.

## 4) Güncelleme

`main`’e push → Hostinger otomatik yeniden build (GitHub entegrasyonu açıksa).

Manuel: hPanel → site → Redeploy / Deploy.

## 5) Kontrol listesi

- [ ] `https://dosyax.com` açılıyor
- [ ] Haberler / indirimler API’den geliyor
- [ ] `https://dosyax.com/link` çalışıyor
- [ ] Studio CORS’ta `https://dosyax.com` ve `https://www.dosyax.com` var
- [ ] Instagram bio linki: `https://dosyax.com/link`

## Alternatif: klasik shared + Git (sadece static)

Node.js Web App yoksa:

```bash
npm run build
```

`dist/` içeriğini `public_html`’e yükle (veya Git’te ayrı `deploy` branch’inde sadece `dist`).  
Bu yöntemde her güncellemede yeniden build gerekir.
