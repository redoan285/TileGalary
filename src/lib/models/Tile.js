import mongoose from "mongoose";

const tileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    dimensions: { type: String, required: true },
    material: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    creator: { type: String, required: true },
    tags: [{ type: String }],
    style: { type: String },
  },
  { timestamps: true }
);

export const Tile = mongoose.models.Tile || mongoose.model("Tile", tileSchema);
