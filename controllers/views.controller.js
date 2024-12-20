import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const renderProducts = async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : undefined,
  };

  const filter = query ? { category: query } : {};

  try {
    const result = await Product.paginate(filter, options);

    res.render("products", {
      status: "success",
      products: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null,
    });
  } catch (error) {
    res.status(500).render("error", { error: "Error al cargar los productos" });
  }
};


export const renderProductDetail = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).render("error", { error: "Producto no encontrado" });
    }
    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).render("error", { error: "Error al cargar el producto" });
  }
};

// Renderizar un carrito específico
export const renderCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) {
      return res.status(404).render("error", { error: "Carrito no encontrado" });
    }
    res.render("cart", { cart });
  } catch (error) {
    res.status(500).render("error", { error: "Error al cargar el carrito" });
  }
};
