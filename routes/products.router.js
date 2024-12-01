
import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

// Ruta para obtener todos los productos
router.get("/", getAllProducts);

// Ruta para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// Ruta para eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

export default router;
