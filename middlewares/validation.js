export const validateProductData = (req, res, next) => {
    const { title, description, price, category, stock } = req.body;
  
    if (!title || !description || !price || !category || stock === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios",
      });
    }
  
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        status: "error",
        message: "El precio debe ser un número mayor a 0.",
      });
    }
  
    if (typeof stock !== "number" || stock < 0) {
      return res.status(400).json({
        status: "error",
        message: "El stock debe ser un número mayor o igual a 0.",
      });
    }
  
    next();
  };
  
  export const validateCartId = (req, res, next) => {
    const { cid } = req.params;
  
    if (!cid || cid.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "El ID del carrito es obligatorio.",
      });
    }
  
    next();
  };
  
  export const validateProductId = (req, res, next) => {
    const { pid } = req.params;
  
    if (!pid || pid.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "El ID del producto es obligatorio.",
      });
    }
  
    next();
  };
  