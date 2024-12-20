import { Router } from 'express';
import Product from '../models/Product.js';  
import Cart from '../models/Cart.js';
import { getProducts } from '../controllers/products.controller.js';  
const router = Router();

// Ruta para visualizar todos los productos con paginación
router.get('/products', async (req, res) => {
  const { page = 1, limit = 10, query = '', sort = '' } = req.query;
  try {
    const products = await getProducts({ page, limit, query, sort });
    res.render('products', {
      products: products.payload,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink
    });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Error al cargar productos' });
  }
});

// Ruta para visualizar los detalles de un producto específico
router.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetails', { product });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Error al cargar el producto' });
  }
});

// Ruta para visualizar un carrito específico
router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }
    res.render('cartDetails', { cart });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Error al cargar el carrito' });
  }
});

export default router;
