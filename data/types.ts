export interface Spesifikasi {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  resolusi: string;
  gpu: string;
  os: string;
}

export interface VarianItem {
  nama_varian: string;
  processor: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  resolusi: string;
  os: string;
  harga_min: number;
  harga_max: number;
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
  varian: VarianItem[];
  kategori: string[];
  catatan: string;
  isu_diketahui: string | null;
  status: string;
  gambar?: string;
}
