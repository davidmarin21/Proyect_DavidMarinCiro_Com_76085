import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { getProducts } from "./controllers/products.controller.js"; // IMPORTAR AQUÍ

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer);

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve("views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Ruta para la vista principal (home)
app.get("/", async (req, res) => {
  try {
    const products = await getProducts(); // Llama a la función correctamente
    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

// Ruta para la vista de productos en tiempo real
app.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos en tiempo real");
  }
});

// WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar el servidor
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
