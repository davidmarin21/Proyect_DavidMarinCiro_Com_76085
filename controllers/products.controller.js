
import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.resolve('productos.json');


export const getAllProducts = async (req, res) => {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(data);
    
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const limitedProducts = limit ? products.slice(0, limit) : products;

    res.status(200).json(limitedProducts);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;

    const data = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(data);

    const product = products.find(p => p.id === pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const data = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(data);

    const newProduct = {
      id: (Date.now()).toString(), // ID autogenerado basado en la fecha
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };

    products.push(newProduct);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updates = req.body;

    const data = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(data);

    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto sin modificar el ID
    products[productIndex] = { ...products[productIndex], ...updates, id: products[productIndex].id };
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

    res.status(200).json(products[productIndex]);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const data = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(data);

    const newProducts = products.filter(p => p.id !== pid);
    if (newProducts.length === products.length) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await fs.writeFile(productsFilePath, JSON.stringify(newProducts, null, 2));

    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
