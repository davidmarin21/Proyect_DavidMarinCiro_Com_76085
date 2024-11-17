
import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('carrito.json'); // Ruta al archivo de carritos

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const data = await fs.readFile(cartsFilePath, 'utf-8');
    const carts = JSON.parse(data);

    const newCart = {
      id: (Date.now()).toString(),
      products: []
    };

    carts.push(newCart);
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

// Obtener los productos en un carrito
export const getCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;

    const data = await fs.readFile(cartsFilePath, 'utf-8');
    const carts = JSON.parse(data);

    const cart = carts.find(c => c.id === cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.status(200).json(cart.products);
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const data = await fs.readFile(cartsFilePath, 'utf-8');
    const carts = JSON.parse(data);

    const cart = carts.find(c => c.id === cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const product = { product: pid, quantity: 1 };
    const existingProduct = cart.products.find(p => p.product === pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push(product);
    }

    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

    res.status(200).json(cart.products);
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};
