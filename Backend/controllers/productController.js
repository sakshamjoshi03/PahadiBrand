const products = require("../data/products");

 
// GET ALL PRODUCTS
// GET /api/products


const getAllProducts = (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
};

 
// GET PRODUCT BY ID
// GET /api/products/:id
 

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        data: product
    });
};

 
// CREATE PRODUCT
// POST /api/products
 

const createProduct = (req, res) => {

    const {
        name,
        category,
        price,
        rating,
        stock,
        image,
        description
    } = req.body;

    if (!name || !category || !price) {
        return res.status(400).json({
            success: false,
            message: "Name, category and price are required."
        });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        rating: rating || 0,
        stock: stock || 0,
        image: image || "",
        description: description || ""
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
};

 
// UPDATE PRODUCT
// PUT /api/products/:id
 

const updateProduct = (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    Object.assign(product, req.body);

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
    });
};


// DELETE PRODUCT
// DELETE /api/products/:id


const deleteProduct = (req, res) => {

    const id = parseInt(req.params.id);

    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct[0]
    });
};


// SEARCH PRODUCT
// GET /api/products/search?q=


const searchProducts = (req, res) => {

    const keyword = req.query.q;

    if (!keyword) {
        return res.status(400).json({
            success: false,
            message: "Search keyword is required"
        });
    }

    const result = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};