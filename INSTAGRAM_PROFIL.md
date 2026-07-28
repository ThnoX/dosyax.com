# Instagram profil & Öne Çıkanlar — manuel kurulum

> Meta Graph API **öne çıkan oluşturamaz**, **biyografi / website güncelleyemez**.  
> Bunlar Instagram uygulamasından elle yapılır. Aşağıdaki metinleri kopyala-yapıştır.

Hesap: **@dosyax.tr**

---

## 1) Biyografi (Bio)

Instagram → Profil → Düzenle → Biyografi:

```
Teknoloji haberleri & seçilmiş indirimler
Güncel fırsatlar hikayede
```

Kısa alternatif (daha az satır):

```
Tech haber · seçilmiş indirim
Hikayeden takip et
```

---

## 2) Web sitesi / bağlantı

**Şimdilik (site yayında değilken):**

- Bağlantı: boş bırakabilirsin  
  veya geçici: `https://www.instagram.com/dosyax.tr/`

**dosyax.com canlı olunca:**

- Ana link: `https://dosyax.com/link`  
  (Haberler + İndirimler + IG tek sayfada)
- İstersen doğrudan:
  - `https://dosyax.com/indirimler`
  - `https://dosyax.com/haberler`

Instagram → Profil → Düzenle → Bağlantılar → Bağlantı ekle / Web sitesi.

---

## 3) Öne çıkanlar (Highlights) — API yok, elle

Önerilen 3 öne çıkan:

| İsim | Ne koyulur | Kapak fikri |
|------|------------|-------------|
| **İndirim** | İndirim hikayeleri | % veya fiyat görseli |
| **Haber** | Haber carousel / story | “Haber” yazılı kare |
| **DosyaX** | Marka / tanıtım | Logo |

### Nasıl eklenir?

1. Bir indirim hikayesi yayınlandıktan sonra (24 saat içinde) hikayeyi aç  
2. Altta **Öne çıkan** → **Yeni öne çıkan**  
3. İsim: `İndirim`  
4. Kapak seç (hikaye karesinden kırp veya galeriden logo)  
5. Sonraki indirim hikayelerinde: Öne çıkan → **İndirim**’e ekle  

Haber için aynı şekilde **Haber** öne çıkanı.

> Studio otomasyonu hikayeyi yayınlar; öne çıkana **ekleme** sadece uygulamadan yapılır.

---

## 4) Profil görseli & isim

- Profil fotoğrafı: `dosyax-logo.png` (masaüstü `dosyax.com/public`)
- Ad: `DosyaX`
- Kullanıcı adı: `dosyax.tr` (değiştirme)

---

## 5) Kontrol listesi

- [ ] Bio yapıştırıldı  
- [ ] Profil fotoğrafı logo  
- [ ] Öne çıkan: İndirim  
- [ ] Öne çıkan: Haber  
- [ ] (Opsiyonel) Öne çıkan: DosyaX  
- [ ] Domain canlı → bio link = `https://dosyax.com/link`

---

## Yerel önizleme (link sayfası)

```
http://localhost:5174/link
```

Canlıda aynı sayfa: `https://dosyax.com/link`
