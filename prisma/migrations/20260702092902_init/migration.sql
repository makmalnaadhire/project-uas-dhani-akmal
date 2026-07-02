-- CreateTable
CREATE TABLE "Laptop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "specs" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);
