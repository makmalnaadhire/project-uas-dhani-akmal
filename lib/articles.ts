export interface Article {
  id: string;
  category: string;
  readTime: string;
  date: string;
  color: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  content: { id: string; en: string };
}

export const articles: Article[] = [
  {
    id: "cara-memilih-prosesor",
    category: "Panduan",
    readTime: "7 menit",
    date: "2025-06-15",
    color: "#d946ef",
    title: {
      id: "Cara Memilih Prosesor Laptop Sesuai Kebutuhan",
      en: "How to Choose a Laptop Processor for Your Needs",
    },
    excerpt: {
      id: "Panduan lengkap memahami perbedaan Intel dan AMD, generasi chip terbaru, serta cara menyesuaikan prosesor dengan aktivitas harian Anda.",
      en: "A complete guide to understanding Intel vs AMD, latest chip generations, and how to match a processor to your daily activities.",
    },
    content: {
      id: `## Mengapa Prosesor Sangat Penting?

Prosesor adalah otak dari setiap laptop. Memilih prosesor yang tepat akan menentukan seberapa cepat dan lancar laptop Anda dalam menjalankan berbagai aplikasi.

## Intel vs AMD: Apa Bedanya?

**Intel** unggul dalam *single-core performance*, cocok untuk aplikasi yang mengandalkan satu thread kuat seperti gaming ringan dan office work.

**AMD Ryzen** menawarkan lebih banyak core pada harga yang sama, ideal untuk *multitasking*, video editing, dan rendering.

## Cara Membaca Nama Prosesor

- **Intel Core i5-1335U**: Angka "13" menandakan generasi ke-13, "35" adalah performance tier, "U" berarti Ultra-low power (hemat baterai).
- **AMD Ryzen 5 7530U**: Angka "7" menandakan seri 7000, "530" adalah model number, "U" berarti hemat daya.

## Rekomendasi Berdasarkan Kebutuhan

| Kebutuhan | Intel | AMD |
|---|---|---|
| Office & Browsing | Core i3 / i5 U-series | Ryzen 3 / Ryzen 5 U |
| Gaming | Core i5/i7 H-series | Ryzen 5/7 HX |
| Video Editing | Core i7/i9 H-series | Ryzen 7/9 HX |
| Programming | Core i5 U-series | Ryzen 5 U |

## Tips Terakhir

Jangan hanya melihat jumlah core. Perhatikan juga *clock speed*, *cache size*, dan TDP (thermal design power) untuk memastikan prosesor sesuai dengan kebutuhan thermal laptop Anda.`,
      en: `## Why the Processor Matters

The processor is the brain of every laptop. Choosing the right one determines how fast and smoothly your laptop runs various applications.

## Intel vs AMD: What's the Difference?

**Intel** excels in *single-core performance*, ideal for applications that rely on a single strong thread like light gaming and office work.

**AMD Ryzen** offers more cores at the same price, perfect for *multitasking*, video editing, and rendering.

## How to Read Processor Names

- **Intel Core i5-1335U**: The "13" indicates 13th generation, "35" is the performance tier, "U" means Ultra-low power (battery efficient).
- **AMD Ryzen 5 7530U**: The "7" indicates the 7000 series, "530" is the model number, "U" means power efficient.

## Recommendations by Use Case

| Use Case | Intel | AMD |
|---|---|---|
| Office & Browsing | Core i3 / i5 U-series | Ryzen 3 / Ryzen 5 U |
| Gaming | Core i5/i7 H-series | Ryzen 5/7 HX |
| Video Editing | Core i7/i9 H-series | Ryzen 7/9 HX |
| Programming | Core i5 U-series | Ryzen 5 U |

## Final Tips

Don't just look at core count. Pay attention to *clock speed*, *cache size*, and TDP (thermal design power) to ensure the processor matches your laptop's thermal requirements.`,
    },
  },
  {
    id: "ram-single-vs-dual-channel",
    category: "Edukasi",
    readTime: "5 menit",
    date: "2025-06-10",
    color: "#a855f7",
    title: {
      id: "Apa itu RAM Single Channel vs Dual Channel?",
      en: "Understanding Single Channel vs Dual Channel RAM",
    },
    excerpt: {
      id: "Kenali perbedaan performa antara RAM single channel dan dual channel, serta kapan Anda benar-benar membutuhkan upgrade.",
      en: "Learn the performance difference between single and dual channel RAM, and when you actually need an upgrade.",
    },
    content: {
      id: `## Apa Itu RAM?

RAM (*Random Access Memory*) adalah memori sementara yang menyimpan data yang sedang diproses oleh CPU. Semakin banyak dan cepat RAM Anda, semakin lancar multitasking.

## Single Channel vs Dual Channel

**Single Channel**: Menggunakan satu keping RAM. Lebar jalur data adalah 64-bit.

**Dual Channel**: Menggunakan dua keping RAM identik. Lebar jalur data mencapai 128-bit, artinya throughput data **hampir dua kali lipat**.

## Kapan Dual Channel Penting?

- **Gaming**: Frame rate bisa meningkat 10-20% dengan dual channel, terutama pada laptop tanpa GPU dedicated.
- **Video Editing**: Export time lebih cepat karena bandwidth memori lebih besar.
- **Aplikasi Berat**: Program seperti Blender, AutoCAD, dan Adobe Premiere memanfaatkan bandwidth tinggi.

## Cara Cek Apakah Laptop Anda Sudah Dual Channel

Gunakan software **CPU-Z** → tab *Memory*. Jika *Channel* menunjukkan "Dual", berarti RAM Anda sudah dual channel.

## Tips Upgrade

Pastikan kedua keping RAM memiliki **kecepatan (MHz) dan ukuran yang sama** untuk performa optimal. Jika tidak, sistem akan menurunkan kecepatan ke yang lebih lambat.`,
      en: `## What is RAM?

RAM (Random Access Memory) is temporary memory that stores data being processed by the CPU. The more and faster your RAM, the smoother multitasking will be.

## Single Channel vs Dual Channel

**Single Channel**: Uses one RAM stick. Data bus width is 64-bit.

**Dual Channel**: Uses two identical RAM sticks. Data bus width reaches 128-bit, meaning data throughput is **nearly doubled**.

## When Does Dual Channel Matter?

- **Gaming**: Frame rate can increase 10-20% with dual channel, especially on laptops without a dedicated GPU.
- **Video Editing**: Export times are faster due to greater memory bandwidth.
- **Heavy Applications**: Programs like Blender, AutoCAD, and Adobe Premiere benefit from high bandwidth.

## How to Check if Your Laptop is Dual Channel

Use **CPU-Z** software → *Memory* tab. If *Channel* shows "Dual", your RAM is already dual channel.

## Upgrade Tips

Make sure both RAM sticks have the **same speed (MHz) and capacity** for optimal performance. Otherwise, the system will downclock to the slower stick's speed.`,
    },
  },
  {
    id: "tips-merawat-baterai",
    category: "Tips",
    readTime: "6 menit",
    date: "2025-06-05",
    color: "#ec4899",
    title: {
      id: "Tips Merawat Baterai Laptop Agar Awet",
      en: "Tips to Keep Your Laptop Battery Healthy",
    },
    excerpt: {
      id: "Kebiasaan sederhana yang bisa memperpanjang umur baterai laptop Anda hingga bertahun-tahun lebih lama.",
      en: "Simple habits that can extend your laptop battery lifespan by several years.",
    },
    content: {
      id: `## Mengapa Baterai Cepat Rusak?

Baterai Lithium-Ion yang digunakan di laptop memiliki siklus充放电 (charge-discharge cycle) terbatas, biasanya **300-500 siklus** sebelum kapasitasnya menurun signifikan.

## Tips Perawatan Baterai

### 1. Jangan Biarkan Baterai 0% atau 100% Terus-Menerus
Idealnya, pertahankan baterai antara **20% hingga 80%**. Gunakan fitur *battery limit* jika laptop Anda mendukungnya (tersedia di Lenovo Vantage, MyASUS, dll).

### 2. Hindari Suhu Ekstrem
Baterai paling optimal pada suhu **20-25°C**. Jangan gunakan laptop di atas bantal atau selimut yang menghalangi ventilasi.

### 3. Gunakan Charger Original
Charger palsu atau tidak resmi dapat merusak sirkuit charging dan mempercepat degradasi baterai.

### 4. Kalibrasi Baterai Secara Berkala
Lakukan kalibrasi setiap 2-3 bulan: charge hingga 100%, gunakan hingga 0%, lalu charge penuh tanpa interupsi.

### 5. Matikan Fitur yang Tidak Perlu
Nonaktifkan Bluetooth, keyboard backlight, dan RGB saat tidak digunakan untuk menghemat daya.

## Tanda Baterai Perlu Diganti

- Kapasitas tersisa di bawah **60%** dari kapasitas desain
- Laptop tiba-tiba mati meskipun baterai masih menunjukkan 20-30%
- Baterai mengembung atau fisiknya berubah bentuk`,
      en: `## Why Do Batteries Degrade?

Lithium-Ion batteries used in laptops have a limited number of charge-discharge cycles, typically **300-500 cycles** before capacity drops significantly.

## Battery Care Tips

### 1. Don't Keep Battery at 0% or 100% Constantly
Ideally, maintain battery between **20% and 80%**. Use the *battery limit* feature if your laptop supports it (available in Lenovo Vantage, MyASUS, etc.).

### 2. Avoid Extreme Temperatures
Batteries perform optimally at **20-25°C**. Don't use your laptop on pillows or blankets that block ventilation.

### 3. Use the Original Charger
Fake or unofficial chargers can damage the charging circuit and accelerate battery degradation.

### 4. Calibrate Battery Regularly
Calibrate every 2-3 months: charge to 100%, use down to 0%, then charge fully without interruption.

### 5. Turn Off Unnecessary Features
Disable Bluetooth, keyboard backlight, and RGB when not in use to save power.

## Signs Your Battery Needs Replacing

- Remaining capacity is below **60%** of design capacity
- Laptop suddenly dies even though battery still shows 20-30%
- Battery is bulging or physically deformed`,
    },
  },
  {
    id: "ssd-nvme-vs-sata",
    category: "Edukasi",
    readTime: "5 menit",
    date: "2025-05-28",
    color: "#f97316",
    title: {
      id: "Perbedaan SSD NVMe dan SATA yang Wajib Diketahui",
      en: "NVMe vs SATA SSD: What You Need to Know",
    },
    excerpt: {
      id: "Memahami perbedaan kecepatan, harga, dan kecocokan antara SSD NVMe dan SATA untuk kebutuhan storage Anda.",
      en: "Understanding the speed, price, and compatibility differences between NVMe and SATA SSDs.",
    },
    content: {
      id: `## Apa Itu SSD?

SSD (*Solid State Drive*) adalah media penyimpanan berbasis flash yang jauh lebih cepat dari HDD tradisional. Saat ini, SSD telah menjadi standar untuk semua laptop modern.

## SATA vs NVMe: Apa Bedanya?

### SATA SSD
- Menggunakan antarmuka SATA III (6 Gbps)
- Kecepatan baca tulis: **~550 MB/s**
- Bentuk: 2.5 inci atau M.2 dengan slot SATA
- Harga: Lebih terjangkau

### NVMe SSD
- Menggunakan antarmuka PCIe (32 Gbps pada PCIe 3.0, 64 Gbps pada PCIe 4.0)
- Kecepatan baca tulis: **hingga 7.000 MB/s** (PCIe 4.0)
- Bentuk: M.2 dengan slot NVMe
- Harga: Sedikit lebih mahal

## Kapan Harus Pilih NVMe?

- **Video Editing**: Transfer file large jauh lebih cepat
- **Gaming**: Load time game berkurang drastis
- **Development**: Compile time lebih singkat

## Kapan SATA Cukup?

- Untuk kebutuhan **office dan browsing** sehari-hari
- Sebagai **drive penyimpanan tambahan** (game, dokumentu)
- Jika budget terbatas

## Cara Cek Slot Laptop Anda

Buka **Device Manager** → *Disk drives*. Jika nama SSD mengandung "NVMe", berarti laptop Anda mendukung NVMe.`,
      en: `## What is an SSD?

An SSD (Solid State Drive) is a flash-based storage medium that is much faster than traditional HDDs. Today, SSDs are the standard for all modern laptops.

## SATA vs NVMe: What's the Difference?

### SATA SSD
- Uses SATA III interface (6 Gbps)
- Read/write speed: **~550 MB/s**
- Form factor: 2.5 inch or M.2 with SATA slot
- Price: More affordable

### NVMe SSD
- Uses PCIe interface (32 Gbps on PCIe 3.0, 64 Gbps on PCIe 4.0)
- Read/write speed: **up to 7,000 MB/s** (PCIe 4.0)
- Form factor: M.2 with NVMe slot
- Price: Slightly more expensive

## When Should You Choose NVMe?

- **Video Editing**: Large file transfers are much faster
- **Gaming**: Game load times decrease dramatically
- **Development**: Compile times are shorter

## When is SATA Enough?

- For daily **office and browsing** needs
- As **additional storage drive** (games, documents)
- If budget is limited

## How to Check Your Laptop's Slot

Open **Device Manager** → *Disk drives*. If the SSD name contains "NVMe", your laptop supports NVMe.`,
    },
  },
  {
    id: "gpu-integrated-vs-dedicated",
    category: "Panduan",
    readTime: "6 menit",
    date: "2025-05-20",
    color: "#06b6d4",
    title: {
      id: "Mengenal GPU Integrated vs Dedicated",
      en: "Integrated vs Dedicated GPU Explained",
    },
    excerpt: {
      id: "Pelajari kapan Anda benar-benar membutuhkan GPU dedicated dan kapan GPU integrated sudah lebih dari cukup.",
      en: "Learn when you truly need a dedicated GPU and when an integrated one is more than enough.",
    },
    content: {
      id: `## Apa Itu GPU?

GPU (*Graphics Processing Unit*) adalah komponen yang bertanggung jawab memproses grafis, dari menampilkan antarmuka desktop hingga menjalankan game 3D.

## GPU Integrated

GPU integrated adalah GPU yang menyatu dengan prosesor (CPU). Contoh: **Intel Iris Xe**, **AMD Radeon Vega**.

**Kelebihan:**
- Hemat daya dan baterai
- Harga laptop lebih terjangkau
- Sudah cukup untuk office, streaming, dan gaming ringan

**Kekurangan:**
- Tidak mampu menjalankan game AAA dengan lancar
- Performa terbatas untuk rendering 3D

## GPU Dedicated

GPU dedicated adalah chip grafis terpisah dari CPU. Contoh: **NVIDIA GeForce RTX**, **AMD Radeon RX**.

**Kelebihan:**
- Performa grafis jauh lebih tinggi
- Cocok untuk gaming, editing video, dan desain 3D
- Memiliki VRAM dedicated (4GB-16GB)

**Kekurangan:**
- Mengkonsumsi lebih banyak daya
- Harga laptop lebih mahal
- Bobot lebih berat

## Rekomendasi

| Kebutuhan | GPU yang Cocok |
|---|---|
| Office & Browsing | Integrated (Intel Iris Xe / AMD Vega) |
| Gaming Ringan | Integrated atau MX-series |
| Gaming AAA | NVIDIA RTX 4060 atau lebih |
| Video Editing | NVIDIA RTX 4050 atau lebih |
| 3D Rendering | NVIDIA RTX 4070 atau lebih |`,
      en: `## What is a GPU?

A GPU (Graphics Processing Unit) is the component responsible for processing graphics, from displaying the desktop interface to running 3D games.

## Integrated GPU

An integrated GPU is built into the processor (CPU). Examples: **Intel Iris Xe**, **AMD Radeon Vega**.

**Pros:**
- Power and battery efficient
- More affordable laptops
- Enough for office, streaming, and light gaming

**Cons:**
- Cannot run AAA games smoothly
- Limited performance for 3D rendering

## Dedicated GPU

A dedicated GPU is a separate graphics chip from the CPU. Examples: **NVIDIA GeForce RTX**, **AMD Radeon RX**.

**Pros:**
- Much higher graphics performance
- Suitable for gaming, video editing, and 3D design
- Has dedicated VRAM (4GB-16GB)

**Cons:**
- Consumes more power
- More expensive laptops
- Heavier weight

## Recommendations

| Use Case | Recommended GPU |
|---|---|
| Office & Browsing | Integrated (Intel Iris Xe / AMD Vega) |
| Light Gaming | Integrated or MX-series |
| AAA Gaming | NVIDIA RTX 4060 or higher |
| Video Editing | NVIDIA RTX 4050 or higher |
| 3D Rendering | NVIDIA RTX 4070 or higher |`,
    },
  },
  {
    id: "membersihkan-kipas-thermal-paste",
    category: "Tips",
    readTime: "8 menit",
    date: "2025-05-12",
    color: "#8b5cf6",
    title: {
      id: "Panduan Membersihkan Kipas dan Thermal Paste Laptop",
      en: "Guide to Cleaning Laptop Fans and Thermal Paste",
    },
    excerpt: {
      id: "Tutorial langkah demi langkah untuk membersihkan kipas laptop dan mengganti thermal paste agar suhu tetap optimal.",
      en: "Step-by-step tutorial for cleaning laptop fans and replacing thermal paste to maintain optimal temperatures.",
    },
    content: {
      id: `## Kapan Harus Membersihkan?

Lakukan pembersihan setiap **6-12 bulan** sekali, atau jika Anda memperhatikan:
- Suhu laptop meningkat drastis saat idle
- Kipas berbunyi keras meskipun tidak menjalankan aplikasi berat
- Performa menurun karena *thermal throttling*

## Yang Perlu Disiapkan

- Obeng Phillips kecil (PH0 atau PH1)
- Kuas anti-statis atau compressed air
- Thermal paste baru (recommend: **Noctua NT-H1** atau **Thermal Grizzly Kryonaut**)
- Cotton bud dan isopropyl alcohol 90%+
- Sarung tangan anti-statis (opsional)

## Langkah Pembersihan

### 1. Matikan dan Buka Casing
Matikan laptop sepenuhnya, lepas baterai (jika removable), dan buka panel belakang dengan obeng.

### 2. Bersihkan Kipas
Gunakan compressed air untuk meniup debu dari kipas. **Tahan kipas** agar tidak berputar saat ditiup (dapat merusak motor).

### 3. Lepas Heatsink
Lepaskan sekrup heatsink secara perlahan, berlawanan arah jarum jam secara bertahap.

### 4. Bersihkan Thermal Paste Lama
Gunakan cotton bud yang dibasahi isopropyl alcohol untuk membersihkan thermal paste lama dari permukaan CPU dan heatsink.

### 5. Aplikasikan Thermal Paste Baru
Tekan satu titik thermal paste seukuran **kacang polong** di tengah dies CPU. Jangan diratakan — heatsink akan menekannya secara merata.

### 6. Pasang Kembali
Pasang kembali heatsink dan sekrupnya dengan urutan silang (cross pattern) untuk tekanan merata.

## Tips Tambahan

- Jangan gunakan thermal paste berlebihan — dapat meluap dan merusak komponen sekitar
- Pastikan semua sekrup dikencangkan dengan cukup, tapi **jangan over-tighten**
- Setelah pemasangan, monitor suhu selama beberapa hari menggunakan **HWMonitor** atau **Core Temp**`,
      en: `## When Should You Clean?

Perform cleaning every **6-12 months**, or if you notice:
- Laptop temperatures increase drastically at idle
- Fan is loud even without running heavy applications
- Performance drops due to *thermal throttling*

## What You'll Need

- Small Phillips screwdriver (PH0 or PH1)
- Anti-static brush or compressed air
- New thermal paste (recommended: **Noctua NT-H1** or **Thermal Grizzly Kryonaut**)
- Cotton buds and 90%+ isopropyl alcohol
- Anti-static gloves (optional)

## Cleaning Steps

### 1. Power Off and Open the Case
Fully shut down the laptop, remove the battery (if removable), and open the back panel with a screwdriver.

### 2. Clean the Fans
Use compressed air to blow dust from the fans. **Hold the fans** to prevent them from spinning when blown (can damage the motor).

### 3. Remove the Heatsink
Slowly remove the heatsink screws, loosening them gradually in a cross pattern.

### 4. Clean Old Thermal Paste
Use a cotton bud dampened with isopropyl alcohol to clean old thermal paste from the CPU and heatsink surfaces.

### 5. Apply New Thermal Paste
Apply a single dot of thermal paste the size of a **pea** in the center of the CPU die. Don't spread it — the heatsink will press it evenly.

### 6. Reassemble
Reattach the heatsink and screws in a cross pattern for even pressure.

## Additional Tips

- Don't use excess thermal paste — it can overflow and damage surrounding components
- Make sure all screws are tightened sufficiently, but **don't over-tighten**
- After reassembly, monitor temperatures for a few days using **HWMonitor** or **Core Temp**`,
    },
  },
];
