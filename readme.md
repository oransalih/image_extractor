# Image Extractor

Web sitelerinden resimleri çıkaran modern bir uygulama.

## Nasıl Çalışır?

1. **Backend (server.js)**: 
   - Verilen URL'ye istek atar
   - HTML'i alır
   - JSDOM ile parse eder
   - Tüm `<img>` taglerini bulur
   - Resim URL'lerini döndürür

2. **Frontend (index.html)**:
   - Kullanıcıdan URL alır
   - Backend'e POST isteği atar
   - Gelen resimleri listeler
   - İndirme özelliği sunar

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Serveri başlat
npm start

# Ya da development modunda (auto-reload ile)
npm run dev
```

## Kullanım

1. Serveri başlat: `npm start`
2. Tarayıcıda aç: `http://localhost:3000`
3. URL gir (örnek: https://www.teksaat.com/taki-ve-aksesuar)
4. "Resimleri Çıkar" butonuna tıkla
5. Resimleri gör ve indir!

## Teknik Detaylar

- **Backend**: Node.js + Express
- **HTML Parser**: JSDOM
- **HTTP Client**: Axios
- **Frontend**: Vanilla JavaScript
- **Port**: 3000

## Özellikler

✅ Herhangi bir web sitesinden resim çıkarma
✅ Lazy-load resimleri tespit etme (data-src, data-lazy-src)
✅ Göreli URL'leri otomatik düzeltme
✅ Tekrar eden resimleri filtreleme
✅ Base64 ve SVG filtreleme
✅ Tek tıkla indirme
✅ Modern ve responsive tasarım
