const express = require("express");
const router = express.Router();
const {
  getTopProducts,
  getProductDetails,
} = require("../services/productService");


// GET /categories/:categoryname/products
router.get("/categories/:categoryname/products", async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sortBy, sortOrder } = req.query;

    if (n > 10 && !page) {
      return res
        .status(400)
        .json({ error: "Page parameter is required when n exceeds 10" });
    }

    const products = await getTopProducts(
      categoryname,
      parseInt(n),
      parseInt(page),
      sortBy,
      sortOrder
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /categories/:categoryname/products/:productid
router.get(
  "/categories/:categoryname/products/:productid",
  async (req, res) => {
    try {
      const { categoryname, productid } = req.params;
      const product = await getProductDetails(categoryname, productid);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

module.exports = router;
