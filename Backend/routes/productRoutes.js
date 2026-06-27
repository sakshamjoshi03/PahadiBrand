const express = require("express");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
} = require("../controllers/productController");

const router = express.Router();

  
// SEARCH PRODUCTS
// GET /api/products/search?q=honey
  

router.get("/search", searchProducts);

  
// GET ALL PRODUCTS
// POST PRODUCT
  

router
    .route("/")
    .get(getAllProducts)
    .post(createProduct);

  
// GET PRODUCT BY ID
// UPDATE PRODUCT
// DELETE PRODUCT
  

router
    .route("/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;