import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const laptops = await prisma.laptop.findMany();
    return NextResponse.json(laptops);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch laptops" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, specs, price, image } = body;

    if (!name || rating === undefined || !specs || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const laptop = await prisma.laptop.create({
      data: { name, rating, specs, price, image },
    });

    return NextResponse.json(laptop, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create laptop" },
      { status: 500 }
    );
  }
}
