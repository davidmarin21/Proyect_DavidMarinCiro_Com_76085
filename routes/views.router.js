import { Router } from "express";
import { getProducts } from "../controllers/products.controller.js";

const router = Router();

// Ruta para la vista principal (home)
router.get("/", async (req, res) => {
  const products = await getProducts();
  res.render("home", { products });
});

// Ruta para la vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  const products = await getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
