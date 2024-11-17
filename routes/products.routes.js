
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getAllProducts);               // Obtener todos los productos
router.get('/:pid', getProductById);           // Obtener un producto por ID
router.post('/', createProduct);               // Crear un nuevo producto
router.put('/:pid', updateProduct);            // Actualizar un producto por ID
router.delete('/:pid', deleteProduct);         // Eliminar un producto por ID

export default router;
