import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, rating, specs, price, image } = body;

    const laptop = await prisma.laptop.update({
      where: { id: parseInt(id) },
      data: { name, rating, specs, price, image },
    });

    return NextResponse.json(laptop);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update laptop" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.laptop.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Laptop deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete laptop" },
      { status: 500 }
    );
  }
}
