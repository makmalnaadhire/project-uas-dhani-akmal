import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const laptops = [
  {
    name: 'MacBook Pro 14" M3',
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
    name: "ASUS ROG Strix G16",
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
    name: "Lenovo ThinkPad E14",
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
];

async function main() {
  console.log("Seeding database...");

  for (const laptop of laptops) {
    await prisma.laptop.upsert({
      where: { id: laptops.indexOf(laptop) + 1 },
      update: laptop,
      create: laptop,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
