import "dotenv/config";
// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const laptops = [
  {
    name: 'MacBook Pro 14" M3',
    brand: "Apple",
    condition: "baru",
    rating: 4.9,
    specs: JSON.stringify({
      processor: "Apple M3",
      ram: "18GB Unified",
      storage: "512GB SSD",
      gpu: "Apple M3 GPU",
    }),
    price: "Rp 27.000.000",
    image: "/images/macbook-pro.jpg",
  },
  {
    name: "MacBook Air M2",
    brand: "Apple",
    condition: "baru",
    rating: 4.8,
    specs: JSON.stringify({
      processor: "Apple M2",
      ram: "8GB Unified",
      storage: "256GB SSD",
      gpu: "Apple M2 GPU",
    }),
    price: "Rp 17.000.000",
    image: "/images/macbook-air.jpg",
  },
  {
    name: "ASUS ROG Strix G16",
    brand: "ASUS",
    condition: "baru",
    rating: 4.7,
    specs: JSON.stringify({
      processor: "Intel Core i7-14650HX",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060",
    }),
    price: "Rp 19.000.000",
    image: "/images/asus-rog.jpg",
  },
  {
    name: "ASUS VivoBook 15",
    brand: "ASUS",
    condition: "baru",
    rating: 4.5,
    specs: JSON.stringify({
      processor: "Intel Core i5-1335U",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe",
    }),
    price: "Rp 9.000.000",
    image: "/images/asus-vivobook.jpg",
  },
  {
    name: "ASUS TUF Gaming A15",
    brand: "ASUS",
    condition: "baru",
    rating: 4.5,
    specs: JSON.stringify({
      processor: "AMD Ryzen 7 7735HS",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050",
    }),
    price: "Rp 15.000.000",
    image: "/images/asus-tuf.jpg",
  },
  {
    name: "Lenovo ThinkPad E14",
    brand: "Lenovo",
    condition: "baru",
    rating: 4.6,
    specs: JSON.stringify({
      processor: "Intel Core i5-1335U",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe",
    }),
    price: "Rp 12.000.000",
    image: "/images/thinkpad.jpg",
  },
  {
    name: "Lenovo LOQ 15",
    brand: "Lenovo",
    condition: "baru",
    rating: 4.6,
    specs: JSON.stringify({
      processor: "AMD Ryzen 7 7840HS",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050",
    }),
    price: "Rp 14.000.000",
    image: "/images/lenovo-loq.jpg",
  },
  {
    name: "Lenovo IdeaPad Slim 3",
    brand: "Lenovo",
    condition: "baru",
    rating: 4.3,
    specs: JSON.stringify({
      processor: "AMD Ryzen 5 7520U",
      ram: "8GB DDR5",
      storage: "512GB SSD",
      gpu: "AMD Radeon 610M",
    }),
    price: "Rp 7.000.000",
    image: "/images/lenovo-ideapad.jpg",
  },
  {
    name: "Dell Inspiron 14",
    brand: "Dell",
    condition: "baru",
    rating: 4.4,
    specs: JSON.stringify({
      processor: "Intel Core i5-1340P",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe",
    }),
    price: "Rp 11.000.000",
    image: "/images/dell-inspiron.jpg",
  },
  {
    name: "HP Pavilion 14",
    brand: "HP",
    condition: "baru",
    rating: 4.2,
    specs: JSON.stringify({
      processor: "AMD Ryzen 5 7535U",
      ram: "8GB DDR5",
      storage: "512GB SSD",
      gpu: "AMD Radeon 660M",
    }),
    price: "Rp 10.000.000",
    image: "/images/hp-pavilion.jpg",
  },
  {
    name: "HP Spectre x360",
    brand: "HP",
    condition: "baru",
    rating: 4.6,
    specs: JSON.stringify({
      processor: "Intel Core i7-1355U",
      ram: "16GB LPDDR5",
      storage: "1TB SSD",
      gpu: "Intel Iris Xe",
    }),
    price: "Rp 17.000.000",
    image: "/images/hp-spectre.jpg",
  },
  {
    name: "MSI Katana 15",
    brand: "MSI",
    condition: "baru",
    rating: 4.4,
    specs: JSON.stringify({
      processor: "Intel Core i7-13620H",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060",
    }),
    price: "Rp 16.000.000",
    image: "/images/msi-katana.jpg",
  },
  {
    name: "Acer Aspire 5",
    brand: "Acer",
    condition: "baru",
    rating: 4.1,
    specs: JSON.stringify({
      processor: "Intel Core i3-1315U",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      gpu: "Intel UHD Graphics",
    }),
    price: "Rp 6.000.000",
    image: "/images/acer-aspire.jpg",
  },
  {
    name: "Acer Swift 3",
    brand: "Acer",
    condition: "baru",
    rating: 4.2,
    specs: JSON.stringify({
      processor: "AMD Ryzen 5 5500U",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      gpu: "AMD Radeon Graphics",
    }),
    price: "Rp 8.000.000",
    image: "/images/acer-swift.jpg",
  },
  {
    name: "Lenovo IdeaPad Gaming 3",
    brand: "Lenovo",
    condition: "second",
    rating: 4.0,
    specs: JSON.stringify({
      processor: "AMD Ryzen 5 5600H",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      gpu: "NVIDIA GTX 1650",
    }),
    price: "Rp 11.000.000",
    image: "/images/lenovo-gaming3.jpg",
  },
  {
    name: "ASUS VivoBook 14",
    brand: "ASUS",
    condition: "second",
    rating: 3.9,
    specs: JSON.stringify({
      processor: "AMD Ryzen 3 5300U",
      ram: "8GB DDR4",
      storage: "256GB SSD",
      gpu: "AMD Radeon Vega 8",
    }),
    price: "Rp 5.000.000",
    image: "/images/asus-vivobook14.jpg",
  },
  {
    name: "HP 15-fd",
    brand: "HP",
    condition: "second",
    rating: 3.7,
    specs: JSON.stringify({
      processor: "Intel Core i3-1215U",
      ram: "4GB DDR4",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics",
    }),
    price: "Rp 4.000.000",
    image: "/images/hp-15.jpg",
  },
  {
    name: "Dell Latitude 5530",
    brand: "Dell",
    condition: "second",
    rating: 4.3,
    specs: JSON.stringify({
      processor: "Intel Core i5-1245U",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe",
    }),
    price: "Rp 10.000.000",
    image: "/images/dell-latitude.jpg",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const laptop of laptops) {
    await prisma.laptop.create({ data: laptop });
  }

  console.log(`Seeded ${laptops.length} laptops successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
