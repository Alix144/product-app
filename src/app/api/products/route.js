import Product from "@/lib/models/Product";
import connectToDb from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "could not find products " + error.message }),
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    await connectToDb();
    const newProduct = new Product(body);
    await newProduct.save();
    return new NextResponse(
      JSON.stringify({ message: "product added", product: newProduct }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
        JSON.stringify({ message: "faild to add product" + error.message }),
        { status: 500 }
      );
  }
};
