// ============================================================
//  ✏️  EDIT FILE INI BUAT GANTI ISI WEBSITE
//  (nama, password, foto, video, alasan, surat, semuanya ada di sini)
// ============================================================

const CONFIG = {
  herName: "Caroline",
  fullName: "Caroline Bertha Ester Grasella Hutasoit",
  age: 20,

  // Nama lu, muncul di bagian bawah surat
  fromName: "Your boyfriend, Faiz",

  // Boleh dikosongin. Contoh: "07 November 2026"
  birthdayDate: "",

  // ----------------------------------------------------------
  // PASSWORD (6 angka, format tanggal DDMMYY)
  // birthday = pintu masuk website, gift = buat buka kado di halaman terakhir
  // ----------------------------------------------------------
  codes: {
    birthday: "071106",
    gift: "220426",
  },

  // ----------------------------------------------------------
  // URUTAN HALAMAN
  // Mau ngurutin ulang? Tinggal tukar posisinya.
  // Mau hapus halaman? Hapus aja katanya dari daftar.
  // Pilihan: "letter", "cover", "memories", "video", "reasons", "cake", "gift"
  // ----------------------------------------------------------
  order: ["letter", "cover", "memories", "video", "reasons", "cake", "gift"],

  // Lagu (opsional). Taruh file mp3 di folder "music", lalu isi contoh: "music/song.mp3"
  music: "music/musicultahoyin2.mp3",

  // ----------------------------------------------------------
  // SURAT DI AMPLOP
  // ----------------------------------------------------------
  greeting: "Hi Caroline",
  greetingSub: "i have something for u, so please read this letter first",

  // Satu baris = satu paragraf
  letter: [
    "Happy 20th birthday, my love!",
    "Selamat bertambah umur dan menginjak 20 tahun!.",
    "Thank you for being so kind, so funny, and so sweet to me. You make my days brighter, and my heart feels warm every time I see you, especially your smile sayang, so keep that smile yah",
    "I hope this year brings you many happy things, especially for your health (sehat terus gamau tau gaboleh sakit2 ), and all the dreams you want. Whatever happens, I will be there for you.",
    "Never forget how special you are. I love you, today and always caroline.",
  ],

  // ----------------------------------------------------------
  // FOTO MUKA CAROLINE PAKAI TOPI ULTAH (halaman "cover")
  // 1. Pakai foto TANPA BACKGROUND (format PNG transparan)
  // 2. Taruh di folder "photos", contoh: photos/caroline.png
  // 3. Ganti "src" di bawah jadi nama file lu
  // 4. Geser topinya kalau belum pas di kepala:
  //    x      = geser kiri/kanan (50% = tengah, makin kecil makin ke kiri)
  //    y      = geser atas/bawah (angka negatif = naik ke atas, contoh "-20%")
  //    width  = ukuran topi (makin besar makin gede)
  //    rotate = miring topi dalam derajat (positif = miring ke kanan)
  //    show   = ganti false kalau gak mau pakai topi
  // ----------------------------------------------------------
  heroPhoto: {
    src: "photos/oyin1.png",
    hat: { show: false, x: "50%", y: "-12%", width: "34%", rotate: 10 },
  },

  // ----------------------------------------------------------
  // FOTO KENANGAN (halaman "memories")
  // 1. Taruh foto lu di folder "photos"
  // 2. Ganti "src" sesuai nama file foto lu
  // 3. Mau nambah foto? Copy satu baris { ... }, tinggal tambahin
  // 4. Mau ngurangin? Hapus aja barisnya
  // ----------------------------------------------------------
  memoriesNote: "Hope we make many more sweet memories together",
  photos: [
    { src: "photos/oyinn2.jpeg", caption: "so beautiful here" },
    { src: "photos/oyinn1.jpeg", caption: "our first date" },
    { src: "photos/oyinn3.jpeg", caption: "that mwuu is so adorable" },
    { src: "photos/oyinsenyum1.jpeg", caption: "i love the way u smile sm btw" },
    { src: "photos/oyinn5.jpeg", caption: "n i love ur hair sooo much" },
    { src: "photos/oyinnlast.jpeg", caption: "n i wish this could be real, soon.." },
  ],

  // ----------------------------------------------------------
  // VIDEO (halaman "video")
  // Cara 1: taruh file video di folder "video", lalu isi src, contoh: "video/our-video.mp4"
  //         (poster = foto sampul video, opsional, contoh: "photos/photo1.svg")
  // Cara 2: upload ke YouTube (Unlisted), lalu isi youtube dengan ID videonya.
  //         Contoh link https://youtu.be/AbCdEfGh123 -> youtube: "AbCdEfGh123"
  // Dua-duanya kosong = tampil kotak "coming soon"
  // ----------------------------------------------------------
  video: {
    src: "video/videooyin.mov",
    poster: "",
    youtube: "",
    note: "press play 🤍",
  },

  // ----------------------------------------------------------
  // 20 ALASAN (boleh diganti sama alasan lu sendiri biar lebih personal)
  // ----------------------------------------------------------
  reasons: [
    "You always make me smile.",
    "Your laugh is my favorite sound.",
    "You are so kind to everyone.",
    "You are so cute when you are angry.",
    "You care about me so much.",
    "You make every day more fun.",
    "You are smart.",
    "Your hugs feel like home.",
    "You always believe in me.",
    "You are beautiful inside and out.",
    "You listen when I need to talk.",
    "You are special for me.",
    "You make simple things special.",
    "You are my best friend.",
    "You are sweet to everyone around you.",
    "You make me want to be better.",
    "Your smile can fix my bad day.",
    "You are my favorite person to eat with.",
    "With you, I can be myself.",
    "Because you are you, Caroline.",
  ],

  wishText: "Yay! I hope your wish comes true",

  // ----------------------------------------------------------
  // KADO (halaman terakhir). Muncul setelah masukin password gift.
  // Baris pertama = tulisan besar, sisanya tulisan kecil.
  // ----------------------------------------------------------
  gift: {
    lines: [
      "Hehe...",
      "Your gift is on its way, so please wait a little bit more.",
    ],
    sign: "I love you",
  },

  // ----------------------------------------------------------
  // TEKS PASSWORD (boleh diganti)
  // ----------------------------------------------------------
  lockText: {
    gateKicker: "for caroline only",
    gateTitle: "Hi, birthday girl",
    gateSub: "Enter the secret code to open your surprise",
    gateHint: "hint: your birthday (DDMMYY)",
    giftTitle: "A secret gift",
    giftSub: "Enter our special date to open it",
    giftHint: "hint: the day we got together (DDMMYY)",
    ok: "Welcome, beautiful",
    bad: "Oops, that is not it. Try again",
  },
};
