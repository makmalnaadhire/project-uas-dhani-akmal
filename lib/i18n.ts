export type Locale = "en" | "id" | "ms" | "es" | "fr";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Hero
    heroBadge: "#1 Laptop Catalog Platform",
    heroTitle: "Laptop Catalog",
    heroSubtitle:
      "Find your dream laptop from thousands of options. Compare specs, read reviews, and get the best recommendations for your needs.",
    heroCta: "Explore Now",
    heroSecondary: "Get Recommendations",

    // Navbar
    navHome: "Home",
    navCatalog: "Catalog",
    navCompare: "Compare",
    navEducation: "Education",
    navAbout: "About",
    navContact: "Contact",
    navCta: "Start Searching",

    // Footer
    footerRights: "All rights reserved.",
    footerAbout: "About",
    footerContact: "Contact",
    footerPrivacy: "Privacy",

    // Featured Section
    featuredTitle: "Featured Laptops",
    featuredSubtitle: "Best laptop recommendations for you",
    featuredCta: "View All Laptops",

    // Catalog
    catalogTitle: "Laptop List",
    catalogSubtitle: "{count} laptops available — find the perfect one for you.",
    catalogEmpty: "No matching laptops found",
    catalogEmptyHint: "Try changing the filter to see more options.",
    filterBrand: "All Brands",
    filterCondition: "All Conditions",
    filterNew: "New",
    filterSecond: "Second",
    filterPopular: "Most Popular",
    filterPriceLow: "Lowest Price",
    filterPriceHigh: "Highest Price",
    detail: "Detail",
  },
  id: {
    // Hero
    heroBadge: "#1 Platform Katalog Laptop",
    heroTitle: "Katalog Laptop",
    heroSubtitle:
      "Temukan laptop impianmu dari ribuan pilihan. Bandingkan spesifikasi, baca review, dan dapatkan rekomendasi terbaik sesuai kebutuhanmu.",
    heroCta: "Jelajahi Sekarang",
    heroSecondary: "Dapatkan Rekomendasi",

    // Navbar
    navHome: "Beranda",
    navCatalog: "Katalog",
    navCompare: "Bandingkan",
    navEducation: "Edukasi",
    navAbout: "Tentang",
    navContact: "Kontak",
    navCta: "Mulai Cari",

    // Footer
    footerRights: "Hak cipta dilindungi.",
    footerAbout: "Tentang",
    footerContact: "Kontak",
    footerPrivacy: "Privasi",

    // Featured Section
    featuredTitle: "Laptop Pilihan",
    featuredSubtitle: "Rekomendasi laptop terbaik untuk Anda",
    featuredCta: "Lihat Semua Laptop",

    // Catalog
    catalogTitle: "Daftar Laptop",
    catalogSubtitle: "{count} laptop tersedia — temukan yang paling cocok untukmu.",
    catalogEmpty: "Tidak ada laptop yang cocok",
    catalogEmptyHint: "Coba ubah filter untuk melihat lebih banyak pilihan.",
    filterBrand: "Semua Merek",
    filterCondition: "Semua Kondisi",
    filterNew: "Baru",
    filterSecond: "Second",
    filterPopular: "Terpopuler",
    filterPriceLow: "Harga Terendah",
    filterPriceHigh: "Harga Tertinggi",
    detail: "Detail",
  },
  ms: {
    heroBadge: "#1 Platform Katalog Laptop",
    heroTitle: "Katalog Laptop",
    heroSubtitle:
      "Cari laptop impian anda dari ribuan pilihan. Bandingkan spesifikasi, baca ulasan, dan dapatkan cadangan terbaik.",
    heroCta: "Terokai Sekarang",
    heroSecondary: "Dapatkan Cadangan",

    navHome: "Utama",
    navCatalog: "Katalog",
    navCompare: "Bandingkan",
    navEducation: "Pendidikan",
    navAbout: "Tentang",
    navContact: "Hubungi",
    navCta: "Mula Mencari",

    footerRights: "Hak cipta terpelihara.",
    footerAbout: "Tentang",
    footerContact: "Hubungi",
    footerPrivacy: "Privasi",

    featuredTitle: "Laptop Pilihan",
    featuredSubtitle: "Cadangan laptop terbaik untuk anda",
    featuredCta: "Lihat Semua Laptop",

    catalogTitle: "Senarai Laptop",
    catalogSubtitle: "{count} laptop tersedia — cari yang paling sesuai.",
    catalogEmpty: "Tiada laptop yang sepadan",
    catalogEmptyHint: "Cuba ubah penapis untuk melihat lebih banyak pilihan.",
    filterBrand: "Semua Jenama",
    filterCondition: "Semua Keadaan",
    filterNew: "Baru",
    filterSecond: "Terpakai",
    filterPopular: "Paling Popular",
    filterPriceLow: "Harga Terendah",
    filterPriceHigh: "Harga Tertinggi",
    detail: "Butiran",
  },
  es: {
    heroBadge: "#1 Plataforma de Catálogo de Laptops",
    heroTitle: "Catálogo de Laptops",
    heroSubtitle:
      "Encuentra tu laptop soñada entre miles de opciones. Compara especificaciones, lee reseñas y obtén las mejores recomendaciones.",
    heroCta: "Explorar Ahora",
    heroSecondary: "Obtener Recomendaciones",

    navHome: "Inicio",
    navCatalog: "Catálogo",
    navCompare: "Comparar",
    navEducation: "Educación",
    navAbout: "Acerca de",
    navContact: "Contacto",
    navCta: "Empezar a Buscar",

    footerRights: "Todos los derechos reservados.",
    footerAbout: "Acerca de",
    footerContact: "Contacto",
    footerPrivacy: "Privacidad",

    featuredTitle: "Laptops Destacadas",
    featuredSubtitle: "Las mejores recomendaciones de laptops para ti",
    featuredCta: "Ver Todas las Laptops",

    catalogTitle: "Lista de Laptops",
    catalogSubtitle: "{count} laptops disponibles — encuentra la perfecta para ti.",
    catalogEmpty: "No se encontraron laptops",
    catalogEmptyHint: "Intenta cambiar el filtro para ver más opciones.",
    filterBrand: "Todas las Marcas",
    filterCondition: "Todas las Condiciones",
    filterNew: "Nuevo",
    filterSecond: "Usado",
    filterPopular: "Más Popular",
    filterPriceLow: "Precio Más Bajo",
    filterPriceHigh: "Precio Más Alto",
    detail: "Detalle",
  },
  fr: {
    heroBadge: "#1 Plateforme de Catalogue d'Ordinateurs",
    heroTitle: "Catalogue d'Ordinateurs",
    heroSubtitle:
      "Trouvez votre ordinateur de rêve parmi des milliers d'options. Comparez les spécifications, lisez les avis et obtenez les meilleures recommandations.",
    heroCta: "Explorer Maintenant",
    heroSecondary: "Obtenir des Recommandations",

    navHome: "Accueil",
    navCatalog: "Catalogue",
    navCompare: "Comparer",
    navEducation: "Éducation",
    navAbout: "À propos",
    navContact: "Contact",
    navCta: "Commencer à Chercher",

    footerRights: "Tous droits réservés.",
    footerAbout: "À propos",
    footerContact: "Contact",
    footerPrivacy: "Confidentialité",

    featuredTitle: "Ordinateurs en Vedette",
    featuredSubtitle: "Les meilleures recommandations d'ordinateurs pour vous",
    featuredCta: "Voir Tous les Ordinateurs",

    catalogTitle: "Liste des Ordinateurs",
    catalogSubtitle: "{count} ordinateurs disponibles — trouvez le parfait pour vous.",
    catalogEmpty: "Aucun ordinateur trouvé",
    catalogEmptyHint: "Essayez de changer le filtre pour voir plus d'options.",
    filterBrand: "Toutes les Marques",
    filterCondition: "Toutes les Conditions",
    filterNew: "Neuf",
    filterSecond: "Occasion",
    filterPopular: "Plus Populaire",
    filterPriceLow: "Prix le Plus Bas",
    filterPriceHigh: "Prix le Plus Élevé",
    detail: "Détail",
  },
};
