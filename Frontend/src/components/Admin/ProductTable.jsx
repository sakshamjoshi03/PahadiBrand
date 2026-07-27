import { useMemo, useState, useEffect } from "react";
import {
    Eye,
    Pencil,
    Trash2,
    Star,
} from "lucide-react";

import ProductDrawer from "./ProductDrawer";
import ProductModal from "./ProductModal";
import DeleteModal from "./DeleteModal";
import EmptyState from "../AI/EmptyState";
import { PackagePlus, SearchX } from "lucide-react";

import "./ProductTable.css";

export default function ProductTable({
    products = [],
    fetchProducts = () => {},
    search = "",
    category = "",
    stock = "",
    sort = "",
    currentPage = 1,
    setCurrentPage = () => {},
    productsPerPage = 10,
}) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [editProduct, setEditProduct] = useState(null);
    const [editOpen, setEditOpen] =useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteProductData, setDeleteProductData] = useState(null);

    const filteredProducts = useMemo(() => {
        let data = [...products];

        // Search
        if (search.trim()) {
            data = data.filter((product) =>
                product.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // Category
        if (category) {
            data = data.filter(
                (product) => product.category === category
            );
        }

        // Stock
        if (stock === "in") {
            data = data.filter(
                (product) => product.stock > 10
            );
        }

        if (stock === "low") {
            data = data.filter(
                (product) =>
                    product.stock > 0 &&
                    product.stock <= 10
            );
        }

        if (stock === "out") {
            data = data.filter(
                (product) => product.stock === 0
            );
        }

        // Sorting
        switch (sort) {

            case "priceLow":
                data.sort((a, b) => a.price - b.price);
                break;

            case "priceHigh":
                data.sort((a, b) => b.price - a.price);
                break;

            case "stock":
                data.sort((a, b) => b.stock - a.stock);
                break;

            case "rating":
                data.sort(
                    (a, b) =>
                        (b.rating || 0) -
                        (a.rating || 0)
                );
                break;

            case "name":
                data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            default:
                break;
        }

        return data;

    }, [products, search, category, stock, sort]);

    // Reset to first page whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, stock, sort, setCurrentPage]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / productsPerPage)
    );

    const indexOfLastProduct =
        currentPage * productsPerPage;

    const indexOfFirstProduct =
        indexOfLastProduct - productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            indexOfFirstProduct,
            indexOfLastProduct
        );

    return (
        <>
            <div className="product-table-card">

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>Image</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {currentProducts.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                    }}
                                >
                                    {products.length === 0 ? (
                                        <EmptyState
                                            icon={PackagePlus}
                                            title="No Products Available"
                                            description="Create your first product to start building your catalog."
                                        />
                                    ) : (
                                        <EmptyState
                                            icon={SearchX}
                                            title="No results found"
                                            description="Try another keyword or adjust your filters."
                                        />
                                    )}
                                </td>

                            </tr>

                        ) : (

                            currentProducts.map((product) => (

                                <tr key={product._id}>

                                    <td>

                                        <img
                                            className="product-image"
                                            alt={`${product.name} thumbnail`}
                                            src={
                                                product.images?.find(
                                                    (img) =>
                                                        img.isPrimary
                                                )?.url ||
                                                product.images?.[0]
                                                    ?.url ||
                                                "/product-images/buransh/main.png"
                                            }
                                        />

                                    </td>

                                    <td className="product-name">

                                        {product.name}

                                    </td>

                                    <td>{product.category}</td>

                                    <td>₹{product.price}</td>

                                    <td>{product.stock}</td>

                                    <td className="rating">

                                        <Star
                                            size={16}
                                            fill="#FFC107"
                                            color="#FFC107"
                                        />

                                        <span>
                                            {product.rating ?? 0}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                product.stock > 10
                                                    ? "status in-stock"
                                                    : product.stock > 0
                                                    ? "status low-stock"
                                                    : "status out-stock"
                                            }
                                        >
                                            {product.stock > 10
                                                ? "In Stock"
                                                : product.stock > 0
                                                ? "Low Stock"
                                                : "Out of Stock"}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                title="View"
                                                onClick={() => {
                                                    setSelectedProduct(
                                                        product
                                                    );
                                                    setDrawerOpen(true);
                                                }}
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                title="Edit"
                                                onClick={() => {
                                                    setEditProduct(
                                                        product
                                                    );
                                                    setEditOpen(true);
                                                }}
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                title="Delete"
                                                className="delete-btn"
                                                onClick={() => {
                                                    setDeleteProductData(
                                                        product
                                                    );
                                                    setDeleteOpen(true);
                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

                <div className="pagination">

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(currentPage - 1)
                        }
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                key={index}
                                className={
                                    currentPage === index + 1
                                        ? "active-page"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentPage(index + 1)
                                }
                            >
                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setCurrentPage(currentPage + 1)
                        }
                    >
                        Next
                    </button>

                </div>

                <div className="pagination-info">

                    Showing{" "}
                    <strong>
                        {filteredProducts.length === 0
                            ? 0
                            : indexOfFirstProduct + 1}
                    </strong>

                    -

                    <strong>
                        {Math.min(
                            indexOfLastProduct,
                            filteredProducts.length
                        )}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {filteredProducts.length}
                    </strong>

                    {" "}products

                </div>

            </div>

            <ProductDrawer
                product={selectedProduct}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <ProductModal
                open={editOpen}
                product={editProduct}
                onClose={() => {
                    setEditOpen(false);
                    setEditProduct(null);
                }}
                onUpdated={fetchProducts}
            />

            <DeleteModal
                open={deleteOpen}
                product={deleteProductData}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteProductData(null);
                }}
                onDeleted={fetchProducts}
            />
        </>
    );
}
