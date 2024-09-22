import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
