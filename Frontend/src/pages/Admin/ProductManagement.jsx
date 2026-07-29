import { useEffect, useState } from "react";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import StatsCards from "../../components/Admin/StatsCards";
import SearchToolbar from "../../components/Admin/SearchToolbar";
import ProductTable from "../../components/Admin/ProductTable";
import AddProductModal from "../../components/Admin/AddProductModal";
import { getAllProducts } from "../../services/productService";

import "./ProductManagement.css";

const getAdminProductsErrorMessage = (err) => {
    if (!err.response) {
        return "Network connection lost. Please check your internet and try again.";
    }

    if (err.response.status === 401) {
        return "Please sign in again to manage products.";
    }

    if (err.response.status >= 500) {
        return "Unable to load products. Please try again.";
    }

    return "Unable to load products.";
};

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [sort, setSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const productsPerPage = 10;

    const fetchProducts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAllProducts();

            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError(getAdminProductsErrorMessage(err));
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const categories = [
        ...new Set(products.map((product) => product.category).filter(Boolean)),
    ];

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <main className="admin-content">

                <AdminHeader />

                {loading ? (
                    <div className="admin-state">
                        <h2>Loading Products...</h2>
                        <p>Please wait while we fetch the product catalog.</p>
                    </div>
                ) : error ? (
                    <div className="admin-state admin-error">
                        <h2>{error}</h2>
                        <p>Please refresh the page or try again shortly.</p>
                    </div>
                ) : (
                    <>
                        <StatsCards products={products} />

                        <div className="admin-toolbar-actions">
                            <button
                                type="button"
                                className="add-product-btn"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                + Add Product
                            </button>
                        </div>

                        <SearchToolbar
                            search={search}
                            setSearch={setSearch}
                            category={category}
                            setCategory={setCategory}
                            stock={stock}
                            setStock={setStock}
                            sort={sort}
                            setSort={setSort}
                            categories={categories}
                        />

                        <ProductTable
                            products={products}
                            fetchProducts={fetchProducts}
                            search={search}
                            category={category}
                            stock={stock}
                            sort={sort}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            productsPerPage={productsPerPage}
                        />

                        <AddProductModal
                            open={isAddModalOpen}
                            onClose={() => setIsAddModalOpen(false)}
                            onCreated={fetchProducts}
                        />
                    </>
                )}

            </main>

        </div>
    );
}
