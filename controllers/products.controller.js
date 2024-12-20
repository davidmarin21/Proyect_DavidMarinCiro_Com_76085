import Product from '../models/Product.js';

// Obtener todos los productos con filtros, paginación y ordenamiento
export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = 'asc', query = {} } = req.query;

    const queryFilters = {};
    if (query.category) queryFilters.category = query.category;
    if (query.stock) queryFilters.stock = { $gte: 1 };

    const products = await Product.find(queryFilters)
      .sort({ price: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(queryFilters);
    const totalPages = Math.ceil(total / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${JSON.stringify(queryFilters)}` : null;
    const nextLink = hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${JSON.stringify(queryFilters)}` : null;

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page - 1,
      nextPage: page + 1,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, thumbnail } = req.body;
    const newProduct = new Product({ title, description, price, category, stock, thumbnail });
    await newProduct.save();
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
