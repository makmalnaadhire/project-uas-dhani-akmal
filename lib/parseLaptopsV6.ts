import { LaptopV6, Varian } from "@/data/types-v6_3_0";

type ParsedLaptop = {
  id: string;
  nama: string;
  merek: string;
  seri: string;
  tahun: number;
  kondisi: string;
  kategori: string;
  catatan: string;
  hargaMinGlobal: number;
  hargaMaxGlobal: number;
  varian: ParsedVarian[];
};

type ParsedVarian = {
  nama: string;
  processor: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  resolusi: string;
  os: string;
  hargaMin: number;
  hargaMax: number;
};

function parseLaptopV6(data: LaptopV6[]): ParsedLaptop[] {
  return data.map((laptop) => ({
    id: laptop.id,
    nama: laptop.nama,
    merek: laptop.merek,
    seri: laptop.seri,
    tahun: laptop.tahun,
    kondisi: laptop.kondisi,
    kategori: laptop.kategori,
    catatan: laptop.catatan,
    hargaMinGlobal: laptop.harga_min,
    hargaMaxGlobal: laptop.harga_max,
    varian: parseVariants(laptop.varian),
  }));
}

function parseVariants(varian: Varian[]): ParsedVarian[] {
  return (varian ?? []).map((v) => ({
    nama: v.nama_varian,
    processor: v.processor,
    ram: v.ram,
    storage: v.storage,
    gpu: v.gpu,
    display: v.display,
    resolusi: v.resolusi,
    os: v.os,
    hargaMin: v.harga_min,
    hargaMax: v.harga_max,
  }));
}

function flattenToVariantList(data: LaptopV6[]) {
  return data.flatMap((laptop) =>
    (laptop.varian ?? []).map((v) => ({
      laptopId: laptop.id,
      laptopNama: laptop.nama,
      merek: laptop.merek,
      seri: laptop.seri,
      tahun: laptop.tahun,
      namaVarian: v.nama_varian,
      processor: v.processor,
      ram: v.ram,
      storage: v.storage,
      gpu: v.gpu,
      hargaMin: v.harga_min,
      hargaMax: v.harga_max,
    }))
  );
}

function filterByMerek(data: LaptopV6[], merek: string): ParsedLaptop[] {
  return parseLaptopV6(data.filter((l) => l.merek.toLowerCase() === merek.toLowerCase()));
}

function filterByHarga(
  data: LaptopV6[],
  min: number,
  max: number
): ParsedLaptop[] {
  return parseLaptopV6(
    data.filter((l) => l.harga_max >= min && l.harga_min <= max)
  );
}

function getVariantsByProcessor(data: LaptopV6[], keyword: string) {
  return flattenToVariantList(data).filter((v) =>
    v.processor.toLowerCase().includes(keyword.toLowerCase())
  );
}

export {
  parseLaptopV6,
  parseVariants,
  flattenToVariantList,
  filterByMerek,
  filterByHarga,
  getVariantsByProcessor,
  type ParsedLaptop,
  type ParsedVarian,
};
