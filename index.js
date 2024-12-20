// index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";  // Asegúrate de importar Server de socket.io
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import { connectDB } from "./config/db.js";  // Tu archivo de conexión de MongoDB

const app = express();
const server = http.createServer(app);  // Crear el servidor HTTP para Express
const io = new Server(server);  // Crear la instancia de Socket.IO

// Exportar 'io' para que pueda ser utilizado en otros archivos
export { io };

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();  
