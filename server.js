const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = 3000;

// CORS'u aç - tüm domainlerden istek kabul et
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ana endpoint - URL'den resimleri çıkar
app.post('/api/extract-images', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL gerekli' });
        }

        // Web sitesini fetch et
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        // HTML'i parse et
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Tüm img taglerini bul
        const imgElements = document.querySelectorAll('img');
        const images = [];

        imgElements.forEach(img => {
            let src = img.src || 
                     img.getAttribute('data-src') || 
                     img.getAttribute('data-lazy-src') ||
                     img.getAttribute('data-original');

            if (src) {
                // Göreli URL'leri tam URL'e çevir
                if (!src.startsWith('http')) {
                    if (src.startsWith('//')) {
                        src = 'https:' + src;
                    } else if (src.startsWith('/')) {
                        const urlObj = new URL(url);
                        src = urlObj.origin + src;
                    } else {
                        src = new URL(src, url).href;
                    }
                }

                // Base64 ve SVG'leri filtrele
                if (!src.startsWith('data:') && !src.includes('.svg')) {
                    images.push(src);
                }
            }
        });

        // Tekrar edenleri kaldır
        const uniqueImages = [...new Set(images)];

        res.json({
            success: true,
            count: uniqueImages.length,
            images: uniqueImages
        });

    } catch (error) {
        console.error('Hata:', error.message);
        res.status(500).json({ 
            error: 'Resimleri çıkarırken hata oluştu',
            message: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
});
