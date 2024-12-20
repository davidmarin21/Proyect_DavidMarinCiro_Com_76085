import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true },
});

// Usar mongoose.models para evitar sobrescribir el modelo
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product