// index.js
import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configurar las rutas
app.use('/api/products', productsRouter);  // Rutas de productos
app.use('/api/carts', cartsRouter);        // Rutas de carritos

// Definir el puerto de escucha
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
