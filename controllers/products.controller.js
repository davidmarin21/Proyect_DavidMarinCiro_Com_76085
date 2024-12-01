import fs from "fs/promises";
import path from "path";
import { io } from "../index.js"; // Importar el servidor de socket.io

const productsFilePath = path.resolve("productos.json");

// Obtener todos los productos
export const getProducts = async () => {
  const data = await fs.readFile(productsFilePath, "utf-8");
  return JSON.parse(data);
};

// Obtener todos los productos y enviarlos como respuesta HTTP
export const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Crear un nuevo producto
export const createProduct = async (product) => {
  const products = await getProducts();
  product.id = Date.now();
  products.push(product);
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

  io.emit("updateProducts", products); // Emitir la actualización
  return product;
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  const products = await getProducts();
  const updatedProducts = products.filter((p) => p.id !== id);

  if (products.length === updatedProducts.length) {
    throw new Error("Producto no encontrado");
  }

  await fs.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2));
  io.emit("updateProducts", updatedProducts); // Emitir la actualización
};
