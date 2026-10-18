// data.js - Data Master untuk Ndalem Pitik
// File ini menyimpan seluruh konten website yang dapat dikelola via Admin Panel

const DEFAULT_DATA = {
  general: {
    farmName: "Ndalem Pitik",
    tagline: "Peternakan Ayam Kampung Kuntara4 & Telur Fertil Premium",
    phone: "089665444702",
    waNumber: "6289665444702",
    email: "ndalem.pitik@gmail.com",
    address: "Dusun Glonggong RT 02 RW 03, PRAMBON, SIDOARJO, JAWATIMUR, INDONESIA",
    copyright: "© 2026 Ndalem Pitik. All rights reserved.",
    logo: "assets/logo.png"
  },
  hero: {
    badge: "100% Organik & Berkualitas Tinggi",
    title: "Pelihara Kualitas, Nikmati Hasil Terbaik dari Ndalem Pitik.",
    description: "Kami menghadirkan ayam Kampung strain unggulan Kuntara4 dengan genetik terbaik, telur fertil berdaya tetas tinggi, telur konsumsi segar harian, serta pakan pilihan untuk mengoptimalkan tumbuh kembang ternak Anda.",
    image: "assets/hero.jpg",
    btnCatalogText: "Lihat Katalog Produk",
    btnWaText: "Hubungi WhatsApp",
    waConsultMessage: "Halo Ndalem Pitik, saya ingin berkonsultasi mengenai pemesanan bibit atau pakan."
  },
  featuresHighlight: [
    {
      id: "feat-1",
      title: "Genetik Unggul",
      desc: "Ayam Kampung Kuntara4 memiliki daya tahan tubuh tinggi dan pertumbuhan optimal."
    },
    {
      id: "feat-2",
      title: "Jaminan Segar",
      desc: "Telur konsumsi diambil langsung setiap pagi untuk menjaga kesegaran maksimal."
    },
    {
      id: "feat-3",
      title: "Pengiriman Aman",
      desc: "Telur fertil dikemas dengan bubble wrap tebal dan pengaman guncangan."
    }
  ],
  catalog: {
    sectionTag: "Daftar Produk",
    sectionTitle: "Produk Pilihan Terbaik untuk Kebutuhan Anda",
    sectionSubtitle: "Silakan filter kategori produk di bawah ini untuk melihat detail produk unggulan peternakan kami.",
    products: [
      {
        id: "prod-1",
        category: "ayam",
        badge: "Ayam Unggul",
        image: "assets/kuntara.jpg",
        title: "Ayam Kampung Kuntara4 (DOC)",
        desc: "Strain ayam kampung unggul dengan pertumbuhan lebih cepat, daya tahan penyakit kuat, serta efisiensi pakan yang sangat baik.",
        price: "Rp 9.500",
        unit: "/ Ekor",
        status: "ready",
        waMessage: "Halo Ndalem Pitik, saya tertarik untuk memesan Ayam Kampung Kuntara4 (DOC)."
      },
      {
        id: "prod-2",
        category: "telur",
        badge: "Penetasan",
        image: "assets/fertil.jpg",
        title: "Telur Kuntara4 Fertil",
        desc: "Telur fertil segar dari indukan pilihan dengan rasio pejantan optimal. Siap untuk dimasukkan ke mesin penetas Anda. Garansi fertilitas.",
        price: "Rp 4.000",
        unit: "/ Butir",
        status: "ready",
        waMessage: "Halo Ndalem Pitik, saya tertarik untuk memesan Telur Kuntara4 Fertil untuk penetasan."
      },
      {
        id: "prod-3",
        category: "telur",
        badge: "Konsumsi",
        image: "assets/fresh.jpg",
        title: "Telur Konsumsi Segar",
        desc: "Telur ayam kampung murni bernutrisi tinggi, bebas dari bahan pengawet kimiawi, tebal cangkangnya, dan sangat segar untuk konsumsi harian keluarga.",
        price: "Rp 2.800",
        unit: "/ Butir",
        status: "ready",
        waMessage: "Halo Ndalem Pitik, saya tertarik untuk memesan Telur Konsumsi Segar harian."
      },
      {
        id: "prod-4",
        category: "pakan",
        badge: "Pakan",
        image: "assets/feed.jpg",
        title: "Pakan Starter Premium (0-4 Minggu)",
        desc: "Campuran pakan bertekstur halus tinggi protein, mineral, dan kalsium yang dirancang untuk mendukung perkembangan tulang dan imun anak ayam.",
        price: "Rp 12.000",
        unit: "/ Kg",
        status: "ready",
        waMessage: "Halo Ndalem Pitik, saya tertarik untuk memesan Pakan Starter Premium (0-4 Minggu)."
      },
      {
        id: "prod-5",
        category: "pakan",
        badge: "Pakan",
        image: "assets/feed.jpg",
        title: "Pakan Grower Organik (5-12 Minggu)",
        desc: "Pakan butiran berkualitas dengan campuran bekatul fermentasi dan vitamin alami untuk mempercepat laju pertumbuhan berat badan ayam remaja.",
        price: "Rp 10.500",
        unit: "/ Kg",
        status: "ready",
        waMessage: "Halo Ndalem Pitik, saya tertarik untuk memesan Pakan Grower Organik (5-12 Minggu)."
      }
    ]
  },
  whyUs: {
    tag: "Mengapa Ndalem Pitik?",
    title: "Kualitas Terjamin Mulai dari Pemilihan Induk",
    desc: "Kami bukan sekadar peternakan biasa. Kami menerapkan standar manajemen kebersihan kandang, biosekuriti yang ketat, dan pemberian asupan bernutrisi seimbang untuk menghasilkan kualitas ternak terbaik.",
    image: "assets/kuntara.jpg",
    items: [
      {
        num: "01",
        title: "Indukan Kuntara4 Murni",
        desc: "Indukan kami dipelihara secara terpisah dengan pengawasan seleksi genetik berstandar tinggi."
      },
      {
        num: "02",
        title: "Pakan Nutrisi Lengkap",
        desc: "Seluruh ayam mengonsumsi pakan racikan alami tinggi serat dan mineral tanpa antibiotik sintetis berlebih."
      },
      {
        num: "03",
        title: "Konsultasi Gratis",
        desc: "Kami bersedia memberikan panduan cara penetasan dan manajemen kandang bagi pelanggan pemula."
      }
    ]
  },
  howToOrder: {
    tag: "Langkah Pembelian",
    title: "Alur Pemesanan yang Mudah dan Cepat",
    desc: "Ikuti 3 tahapan mudah berikut untuk memesan kebutuhan peternakan Anda di Ndalem Pitik.",
    steps: [
      {
        number: "1",
        title: "Pilih Produk",
        desc: "Tentukan jenis ayam, telur fertil, atau pakan yang ingin Anda beli pada katalog kami."
      },
      {
        number: "2",
        title: "Kirim Pesan WhatsApp",
        desc: "Klik tombol pesan di kartu produk untuk mengirim pre-filled template chat otomatis ke admin kami."
      },
      {
        number: "3",
        title: "Konfirmasi & Kirim",
        desc: "Lakukan pembayaran, lalu pesanan akan langsung dikirim atau Anda ambil di lokasi peternakan."
      }
    ]
  },
  testimonials: {
    tag: "Testimoni Pelanggan",
    title: "Kisah Sukses Bersama Ndalem Pitik",
    desc: "Berikut ulasan jujur dari beberapa mitra peternak dan pelanggan setia Ndalem Pitik.",
    items: [
      {
        id: "testi-1",
        text: "Daya tetas telur fertil Kuntara4 dari Ndalem Pitik luar biasa tinggi! Dari 50 butir, 45 butir berhasil menetas sehat di inkubator saya. Sangat direkomendasikan!",
        name: "Budi Santoso",
        role: "Peternak Mandiri, Sleman",
        avatar: "B"
      },
      {
        id: "testi-2",
        text: "Telur konsumsinya sangat segar dan rasanya gurih sekali. Cangkangnya tebal menandakan asupan kalsium ayamnya sangat baik. Langganan buat keluarga.",
        name: "Rina Wijayanti",
        role: "Ibu Rumah Tangga, Bantul",
        avatar: "R"
      },
      {
        id: "testi-3",
        text: "Pakan starternya sangat wangi dan disukai anak ayam. Pertumbuhan DOC Kuntara saya jadi lebih seragam dan tidak gampang stres. Terima kasih Ndalem Pitik.",
        name: "Hendra Setiawan",
        role: "Mitra Peternak, Kulon Progo",
        avatar: "H"
      }
    ]
  },
  adminSettings: {
    pin: "admin123"
  }
};

const STORAGE_KEY = "ndalem_pitik_site_data";

// Helper Functions
function getSiteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const parsed = JSON.parse(raw);
    return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
  } catch (err) {
    console.error("Gagal membaca data dari localStorage:", err);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveSiteData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error("Gagal menyimpan data ke localStorage:", err);
    return false;
  }
}

function resetSiteData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}
