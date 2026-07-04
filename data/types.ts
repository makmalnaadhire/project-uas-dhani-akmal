export interface Spesifikasi {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  resolusi: string;
  gpu: string;
  os: string;
}

export interface Laptop {
  id: string;
  nama: string;
  merek: string;
  seri: string;
  tahun: number;
  harga_min: number;
  harga_max: number;
  kondisi: string;
  spesifikasi: Spesifikasi;
  kategori: string[];
  catatan: string;
  isu_diketahui: string | null;
  status: string;
  gambar?: string;
}
