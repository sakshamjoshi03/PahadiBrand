import {
    Package,
    Layers3,
    AlertTriangle,
    XCircle,
    DollarSign,
    Star,
    Boxes,
    Sparkles,
} from "lucide-react";

import "./StatsCards.css";

export default function StatsCards({ products = [] }) {

    const totalProducts = products.length;

    const totalCategories =
        new Set(products.map((p) => p.category)).size;

    const totalInventory = products.reduce(
        (sum, product) => sum + product.stock,
        0
    );

    const lowStock = products.filter(
        (product) =>
            product.stock > 0 &&
            product.stock <= 10
    ).length;

    const outOfStock = products.filter(
        (product) => product.stock === 0
    ).length;

    const avgRating =
        totalProducts === 0
            ? 0
            : (
                  products.reduce(
                      (sum, product) =>
                          sum + (product.rating || 0),
                      0
                  ) / totalProducts
              ).toFixed(1);

    const inventoryValue = products.reduce(
        (sum, product) =>
            sum + product.price * product.stock,
        0
    );

    const featuredProducts = products.filter(
        (product) => product.featured
    ).length;

    const cards = [
        {
            title: "Products",
            value: totalProducts,
            icon: Package,
        },
        {
            title: "Categories",
            value: totalCategories,
            icon: Layers3,
        },
        {
            title: "Inventory",
            value: totalInventory,
            icon: Boxes,
        },
        {
            title: "Average Rating",
            value: avgRating,
            icon: Star,
        },
        {
            title: "Low Stock",
            value: lowStock,
            icon: AlertTriangle,
        },
        {
            title: "Out Of Stock",
            value: outOfStock,
            icon: XCircle,
        },
        {
            title: "Inventory Value",
            value: `₹${inventoryValue.toLocaleString()}`,
            icon: DollarSign,
        },
        {
            title: "Featured",
            value: featuredProducts,
            icon: Sparkles,
        },
    ];

    return (

        <div className="stats-grid">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <div
                        key={index}
                        className="stats-card"
                    >

                        <div className="stats-icon">

                            <Icon size={28} />

                        </div>

                        <div>

                            <p className="stats-title">

                                {card.title}

                            </p>

                            <h2 className="stats-value">

                                {card.value}

                            </h2>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}
