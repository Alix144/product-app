import User from "@/lib/models/User";
import { authOptions } from "@/lib/nextAuth";
import connectToDb from "@/lib/utils";
import { connect } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose, { Schema, model, models, Types } from "mongoose";
import Product from "@/lib/models/Product";

const ObjectId = require("mongoose").Types.ObjectId;

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { userId, productId } = body;

    await connectToDb();

    // Does the product exist ?
    let existingProduct;
    try{
        existingProduct = await Product.findById(productId)
    }catch(err){
        console.log(err)
    }
    if(!existingProduct){
        return new NextResponse(JSON.stringify({ message: "Unable to Find a product by This ID" }), {
            status: 400,
        })
    }

    if (!userId || !productId) {
      return new NextResponse(
        JSON.stringify({ message: "Product id or user id is required" }),
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId }, // Find user by their ID
      { $push: { cart: new ObjectId(productId) } }, // Add product ID to cart array
      { new: true } // Return the updated document
    );

    if (!updatedUser)
      return new NextResponse(JSON.stringify({ message: "Updated User not found" }), {
        status: 400,
    });

    return new NextResponse(
      JSON.stringify({ message: "User is updated", user: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error from Ali line 51: " + error.message }),
      { status: 500 }
    );
  }
};
