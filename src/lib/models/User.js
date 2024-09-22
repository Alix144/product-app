import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    cart:[
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
