# 🎂 Birthday Website buat Caroline (v2, elegan)

Website statis (HTML + CSS + JS biasa), gak perlu build apa-apa. Langsung bisa di-deploy ke Vercel.
Tampilannya per halaman: tiap halaman harus diklik tombol **Continue →** buat lanjut (gak di-scroll), dan rapi di HP.

## Alur website

1. 🔒 Password pertama: tanggal lahir **071106**
2. 💌 Amplop. Diklik, keluar surat "Hai Caroline ♥ / i have something for you" + wish
3. 🎀 Cover: foto muka Caroline pakai topi ultah + love-love bergerak
4. 📸 Our Little Memories: tumpukan foto, ada tulisan "Hope we make many more sweet memories together"
5. 🎬 Video hasil editan lu
6. 💗 20 Reasons Why I Love You
7. 🎂 Kue, tiup lilinnya
8. 🎁 Kado di halaman paling bawah. Diklik, minta password kedua: tanggal jadian **220426**, lalu keluar surat "Your gift is on its way..."

Semua teks, password, dan urutan halaman bisa diubah di **`config.js`**.

## Isi folder

```
index.html   -> struktur halaman (jarang perlu diubah)
style.css    -> tampilan & animasi
script.js    -> logika
config.js    -> ✏️ INI YANG LU EDIT
photos/      -> taruh semua foto di sini
video/       -> taruh video di sini
music/       -> (opsional) lagu mp3
```

## 1. Ganti foto kenangan (halaman Memories)

1. Taruh foto di folder `photos/` (contoh: `kita1.jpg`)
2. Edit bagian `photos` di `config.js`:

```js
photos: [
  { src: "photos/kita1.jpg", caption: "Our first date" },
  { src: "photos/kita2.jpg", caption: "Trip to the beach" },
],
```

Mau nambah foto, tambah satu baris. Mau ngurangin, hapus barisnya.
Tips: foto portrait (4:5) paling cakep. Kecilin ukurannya dulu (idealnya di bawah 500 KB per foto) biar cepet kebuka di HP.

## 2. Foto muka Caroline + topi ultah (halaman Cover)

Foto ini harus **tanpa background** (PNG transparan), makanya tadi gua kasih placeholder kartun dulu.

**Cara bikin foto tanpa background:**
- Paling gampang: upload ke **remove.bg** atau **Photoroom** (gratis), lalu download hasil PNG-nya.
- iPhone: buka foto di Photos, tahan jari di orangnya sampai muncul garis putih (Lift subject), pilih **Copy**, lalu paste ke Notes dan save sebagai gambar. Hasil terbaik biasanya tetap lewat remove.bg.
- Canva: fitur Background Remover (versi Pro).

**Tips fotonya:** foto setengah badan atau sebatas bahu, muka menghadap depan, rambut atas gak kepotong. Crop rapi di sekeliling orangnya, lebar sekitar 800 px.

**Cara masukinnya:**
1. Simpan PNG-nya di `photos/`, misal `photos/caroline.png`
2. Di `config.js` ganti:

```js
heroPhoto: {
  src: "photos/caroline.png",
  hat: { show: true, x: "50%", y: "-12%", width: "34%", rotate: 10 },
},
```

**Cara geser topi biar pas di kepala** (ubah angkanya, save, refresh):
- `y` = naik/turun. Angka negatif = naik. Topi kurang tinggi? Coba `"-16%"`. Kelewat tinggi? Coba `"-8%"`
- `x` = geser kiri/kanan (`"50%"` tengah. Kepalanya agak ke kiri? Coba `"45%"`)
- `width` = ukuran topi (`"30%"` lebih kecil, `"40%"` lebih besar)
- `rotate` = miringnya. Positif miring ke kanan, negatif ke kiri
- Gak mau pakai topi? `show: false`

## 3. Masukin video

**Cara 1 (file langsung):** taruh video di folder `video/` (format `.mp4`), lalu di `config.js`:

```js
video: { src: "video/our-video.mp4", poster: "", youtube: "", note: "press play 🤍" },
```

Kalau videonya gede banget (ratusan MB), mending compress dulu pakai HandBrake atau CapCut (export 720p/1080p).

**Cara 2 (YouTube):** upload ke YouTube dengan mode **Unlisted**. Kalau linknya `https://youtu.be/AbCdEfGh123`, isi `youtube: "AbCdEfGh123"`.

Kalau dua-duanya kosong, tampil kotak "Our little movie is coming soon".

## 4. Ganti password & teks

Di `config.js`:

```js
codes: { birthday: "071106", gift: "220426" },   // format DDMMYY
```

Ganti juga `fromName` pakai nama lu, dan edit `letter`, `reasons`, `gift.lines` biar makin personal.

> ⚠️ Password ini cuma kunci lucu-lucuan. Kodenya ada di file `config.js` jadi teknisnya bisa diintip lewat "view source". Buat ngasih surprise ke pacar sih aman.

## 5. Ubah urutan halaman

Di `config.js`, bagian `order`. Contoh buang halaman video dan reasons:

```js
order: ["letter", "cover", "memories", "cake", "gift"],
```

## Lihat hasilnya di laptop

```
npx serve .
```

lalu buka link yang muncul. Bisa juga double click `index.html` (kalau ada yang aneh, pakai `npx serve`). Buat ngecek tampilan HP: buka di browser, tekan F12, lalu pilih mode device.

## Upload ke Vercel

### Cara 1: lewat GitHub (paling enak, tiap update otomatis ke-deploy)
1. Bikin repo baru di GitHub, upload semua isi folder ini.
2. Buka vercel.com, login, **Add New > Project**, pilih repo tadi.
3. Framework Preset: **Other**. Build command dan output directory dikosongin.
4. **Deploy**. Selesai, lu dapet link.
5. Mau ganti foto/video lagi? Upload file baru + edit `config.js` di GitHub, Vercel otomatis update.

### Cara 2: lewat terminal
```
npm i -g vercel
cd birthday-caroline
vercel
```
Jawab semua pertanyaan pakai Enter (default). Buat update lagi: `vercel --prod`.

## Tips
- Fontnya diambil dari Google Fonts, jadi butuh internet pas dibuka (di HP pasti aman).
- Link Vercel bisa diganti lebih cakep di Settings > Domains (misal `happy20caroline.vercel.app`).
- Kirim linknya pas jam 00:00 biar makin surprise 😆
