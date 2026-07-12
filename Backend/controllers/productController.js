const Product = require("../models/Product");


// GET ALL PRODUCTS
// GET /api/products

const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// GET PRODUCT BY ID
// GET /api/products/:id

const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

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

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// CREATE PRODUCT
// POST /api/products
const createProduct = async (req, res) => {

    try {

        const {
            name,
            slug,
            category,
            price,
            stock,
            rating,
            reviewCount,
            description,
            fullDescription,
            images,
            features,
            specifications,
            sustainability,
            tags,
            aiContext,
            isFeatured,
            isActive
        } = req.body;

        if (!name || !category || price == null) {
            return res.status(400).json({
                success: false,
                message: "Name, category and price are required."
            });
        }

        const newProduct = await Product.create({

            name,
            slug,
            category,
            price,
            stock,
            rating,
            reviewCount,
            description,
            fullDescription,
            images,
            features,
            specifications,
            sustainability,
            tags,
            aiContext,
            isFeatured,
            isActive

        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// UPDATE PRODUCT
// PUT /api/products/:id

const updateProduct = async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE PRODUCT
// DELETE /api/products/:id

const deleteProduct = async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// SEARCH PRODUCTS
// GET /api/products/search?q=

const searchProducts = async (req, res) => {

    try {

        const keyword = req.query.q;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: "Search keyword is required"
            });
        }

        const result = await Product.find({

        $or: [

            {
                name: {
                    $regex: keyword,
                    $options: "i"
                }
            },

            {
                category: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: keyword,
                    $options: "i"
                }
            },

            {
                tags: {
                    $elemMatch: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            }

        ]

    }); 

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// GET RELATED PRODUCTS
// GET /api/products/related/:category/:id

const getRelatedProducts = async (req, res) => {

    try {

        const { category, id } = req.params;

        const relatedProducts = await Product.find({

            category,

            _id: {
                $ne: id
            },

            isActive: true

        }).limit(4);

        res.status(200).json({

            success: true,

            count: relatedProducts.length,

            data: relatedProducts

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getRelatedProducts
};