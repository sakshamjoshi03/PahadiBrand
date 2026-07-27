import { Search } from "lucide-react";

import "./SearchToolbar.css";

export default function SearchToolbar({

    search,

    setSearch,

    category,

    setCategory,

    stock,

    setStock,

    sort,

    setSort,

    categories,

}) {

    return (

        <div className="search-toolbar">

            <div className="search-box">

                <label htmlFor="admin-search" className="sr-only">Search products</label>
                <Search size={18} aria-hidden="true" />

                <input
                    id="admin-search"
                    type="text"
                    placeholder="Search products..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

            </div>

            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select
                id="category-filter"
                value={category}

                onChange={(e) =>

                    setCategory(e.target.value)

                }

            >

                <option value="">

                    All Categories

                </option>

                {

                    categories.map((cat) => (

                        <option

                            key={cat}

                            value={cat}

                        >

                            {cat}

                        </option>

                    ))

                }

            </select>

            <label htmlFor="stock-filter" className="sr-only">Filter by stock</label>
            <select
                id="stock-filter"
                value={stock}

                onChange={(e) =>

                    setStock(e.target.value)

                }

            >

                <option value="">

                    All Stock

                </option>

                <option value="in">

                    In Stock

                </option>

                <option value="low">

                    Low Stock

                </option>

                <option value="out">

                    Out Of Stock

                </option>

            </select>

            <label htmlFor="sort-filter" className="sr-only">Sort products</label>
            <select
                id="sort-filter"
                value={sort}

                onChange={(e) =>

                    setSort(e.target.value)

                }

            >

                <option value="">

                    Sort By

                </option>

                <option value="priceLow">

                    Price ↑

                </option>

                <option value="priceHigh">

                    Price ↓

                </option>

                <option value="stock">

                    Stock

                </option>

                <option value="rating">

                    Rating

                </option>

                <option value="name">

                    Name

                </option>

            </select>

        </div>

    );

}