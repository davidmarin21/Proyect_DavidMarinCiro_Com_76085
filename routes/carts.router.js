import { Router } from 'express';
import {
  createCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
  updateCart,
  updateProductQuantityInCart,
  deleteAllProductsFromCart
} from '../controllers/carts.controller.js';

const router = Router();


router.post('/', createCart);


router.get('/:cid', getCartProducts);


router.post('/:cid/product/:pid', addProductToCart);

router.delete('/:cid/products/:pid', deleteProductFromCart);


router.put('/:cid', updateCart);


router.put('/:cid/products/:pid', updateProductQuantityInCart);


router.delete('/:cid', deleteAllProductsFromCart);

export default router;
