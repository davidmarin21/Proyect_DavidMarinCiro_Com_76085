
import { Router } from 'express';
import {
  createCart,
  getCartProducts,
  addProductToCart
} from '../controllers/carts.controller.js';

const router = Router();

router.post('/', createCart);                          // Crear un nuevo carrito
router.get('/:cid', getCartProducts);                  // Obtener los productos de un carrito
router.post('/:cid/product/:pid', addProductToCart);   // Agregar un producto a un carrito

export default router;
