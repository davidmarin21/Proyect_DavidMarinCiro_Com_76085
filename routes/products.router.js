import { Router } from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct
} from '../controllers/products.controller.js';

const router = Router();

// Obtener todos los productos con filtros, paginación y ordenamiento
router.get('/', getProducts);

// Crear un nuevo producto
router.post('/', createProduct);


router.get('/:pid', getProductById);


router.delete('/:pid', deleteProduct);

export default router;
