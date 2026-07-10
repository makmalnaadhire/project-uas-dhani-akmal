export interface Varian {
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

export interface LaptopV6 {
  id: string;
  nama: string;
  merek: string;
  seri: string;
  tahun: number;
  kondisi: string;
  harga_min: number;
  harga_max: number;
  kategori: string;
  catatan: string;
  varian: Varian[];
}
