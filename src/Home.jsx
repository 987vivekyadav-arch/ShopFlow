import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import {Wishlist} from "./shopflow.js"

function Home() {
    const navigate = useNavigate()

    const [products, setProducts] = React.useState([])
    const [category, setCategory] = React.useState([])
    const [search, setSearch] = React.useState("")

    useEffect(function() {
        fetch("https://dummyjson.com/products?limit=194")
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setProducts(data.products)

            const uniqueCategories = [
                ...new Set(data.products.map(function(item) {
                    return item.category
                }))
            ]

            setCategory(uniqueCategories)

            return fetch("https://shopflow-wkvz.onrender.com/home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    products: data.products
                })
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log("MongoDB save response:", data)
        })
        .catch(function(error) {
            console.log("Error:", error)
        })
    }, [])

    function filteredData() {
        const result = products.filter(function(item) {
            return item.title.toLowerCase().includes(search.toLowerCase())
        })

        return result
    }

    function getCategoryImage(categoryName) {
        const product = products.find(function(item) {
            return item.category === categoryName
        })

        if (product) {
            return product.thumbnail
        }

        return ""
    }

    function openCategory(item) {
        navigate("/products/" + encodeURIComponent(item))
    }

    function scrollToProducts() {
        document.getElementById("home-products").scrollIntoView({
            behavior: "smooth"
        })
    }

    const bigCategories = [
        {
            name: "beauty",
            title: "Beauty & Care",
            description: "Discover your everyday essentials.",
            style: "big-category-beauty"
        },
        {
            name: "fragrances",
            title: "Fragrances",
            description: "Find a fragrance for every moment.",
            style: "big-category-fragrance"
        },
        {
            name: "furniture",
            title: "Home & Furniture",
            description: "Make your space feel like home.",
            style: "big-category-furniture"
        },
        {
            name: "groceries",
            title: "Fresh Groceries",
            description: "Explore everyday favourites.",
            style: "big-category-grocery"
        }
    ]






    return (
        <div className="home-page">

            {/* Header */}
            <header className="home-header">

                <div
                    className="home-logo"
                    onClick={function() {
                        navigate("/")
                    }}
                >
                    ShopFlow
                </div>

                <div className="home-header-text">
                    <h3>Discover products</h3>
                    <p>Find what you need</p>
                </div>

                <div className="home-search">
                    <span className="search-icon">⌕</span>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={function(e) {
                            setSearch(e.target.value)
                        }}
                    />

                    {search !== "" && (
                        <button
                            className="clear-search"
                            onClick={function() {
                                setSearch("")
                            }}
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="home-auth">
                    <button
                        className="login-button"
                        onClick={function() {
                            navigate("/login")
                        }}
                    >
                        Login
                    </button>

                    <button
                        className="register-button"
                        onClick={function() {
                            navigate("/register")
                        }}
                    >
                        Get Started
                    </button>
                </div>

            </header>

            <main className="home-main">

                {search === "" && (
                    <>
                        {/* Main Banner */}
                        <section className="home-banner">

                            <div className="banner-content">
                                <span className="banner-label">
                                    WELCOME TO SHOPFLOW
                                </span>

                                <h1>
                                    Find your next
                                    <br />
                                    favourite product.
                                </h1>

                                <p>
                                    Explore products across different categories.
                                </p>

                                <button
                                    className="banner-button"
                                    onClick={scrollToProducts}
                                >
                                    Explore Products
                                </button>
                            </div>

                            <div className="banner-image">
                                {products.length > 0 && (
                                    <img
                                        src={products[0].thumbnail}
                                        alt={products[0].title}
                                    />
                                )}
                            </div>

                        </section>

                        {/* Four Big Categories */}
                        <section className="big-category-section">

                            <div className="big-category-grid">

                                {bigCategories.map(function(item) {
                                    return (
                                        <div
                                            className={
                                                "big-category-card " + item.style
                                            }
                                            key={item.name}
                                            onClick={function() {
                                                openCategory(item.name)
                                            }}
                                        >

                                            <div className="big-category-content">
                                                <span className="big-category-label">
                                                    EXPLORE SHOPFLOW
                                                </span>

                                                <h2>{item.title}</h2>

                                                <p>{item.description}</p>

                                                <button
                                                    className="big-category-button"
                                                    onClick={function(e) {
                                                        e.stopPropagation()
                                                        openCategory(item.name)
                                                    }}
                                                >
                                                    Shop Now →
                                                </button>
                                            </div>

                                            <div className="big-category-image">
                                                {getCategoryImage(item.name) !== "" && (
                                                    <img
                                                        src={getCategoryImage(item.name)}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>

                                        </div>
                                    )
                                })}

                            </div>

                        </section>

                        {/* Original Shop by Category */}
                        <section className="category-section">

                            <div className="section-heading">
                                <div>
                                    <h2>Shop by Category</h2>
                                    <p>Explore our product categories</p>
                                </div>

                                <span className="category-count">
                                    {category.length} categories
                                </span>
                            </div>

                            <div className="category-grid">

                                {category.map(function(item) {
                                    return (
                                        <button
                                            className="category-card"
                                            key={item}
                                            onClick={function() {
                                                openCategory(item)
                                            }}
                                        >

                                            <div className="category-image">
                                                {getCategoryImage(item) !== "" && (
                                                    <img
                                                        src={getCategoryImage(item)}
                                                        alt={item}
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>

                                            <span className="category-name">
                                                {item}
                                            </span>

                                            <span className="category-arrow">
                                                →
                                            </span>

                                        </button>
                                    )
                                })}

                            </div>

                        </section>
                    </>
                )}

                {/* Products */}
                <section
                    className="home-products-section"
                    id="home-products"
                >

                    <div className="section-heading">
                        <div>
                            <h2>
                                {search === ""
                                    ? "Explore Products"
                                    : "Search Results"
                                }
                            </h2>

                            <p>
                                {search === ""
                                    ? "Discover products you might like"
                                    : "Products matching: " + search
                                }
                            </p>
                        </div>

                        <span className="product-count">
                            {filteredData().length} products
                        </span>
                    </div>

                    <div className="home-product-grid">

                        {filteredData().map(function(item) {
                            return (
                                <div
                                    className="home-product-card"
                                    key={item.id}
                                    onClick={function() {
                                        navigate("/singleproducts/" + item.id)
                                    }}
                                >

                                    <button className="wishlist-button"
                                    onClick={function(e){
                                       e.stopPropagation()
                                        Wishlist(item)
                                    }}
                                    >
                                        ♡
                                    </button>

                                    <div className="home-product-image">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            loading="lazy"
                                        />

                                        {item.discountPercentage > 0 && (
                                            <span className="product-discount">
                                                {Math.round(item.discountPercentage)}% OFF
                                            </span>
                                        )}
                                    </div>

                                    <div className="home-product-info">

                                        <span className="home-product-category">
                                            {item.category}
                                        </span>

                                        <h3>{item.title}</h3>

                                        <div className="home-product-rating">
                                            <span>★</span>
                                            {item.rating}
                                        </div>

                                        <div className="home-product-bottom">
                                            <span className="home-product-price">
                                                ${item.price}
                                            </span>

                                            <button
                                                className="view-product-button"
                                                onClick={function(e) {
                                                    e.stopPropagation()
                                                    navigate("/product/" + item.id)
                                                }}
                                            >
                                                View
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                    {search !== "" && filteredData().length === 0 && (
                        <div className="no-products">
                            <div className="no-products-icon">⌕</div>
                            <h3>No products found</h3>

                            <p>
                                No products match "{search}". Try another search.
                            </p>

                            <button
                                onClick={function() {
                                    setSearch("")
                                }}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                </section>

                {/* Bottom Category Directory */}
                {search === "" && (
                    <section className="bottom-category-section">

                        <div className="bottom-category-heading">
                            <div>
                                <h2>Categories</h2>
                                <p>Explore everything on ShopFlow</p>
                            </div>

                            <button
                                className="bottom-see-all"
                                onClick={function() {
                                    document.getElementById("all-categories").scrollIntoView({
                                        behavior: "smooth"
                                    })
                                }}
                            >
                                See all
                            </button>
                        </div>

                        <div
                            className="bottom-category-grid"
                            id="all-categories"
                        >

                            {category.map(function(item) {
                                return (
                                    <button
                                        className="bottom-category-link"
                                        key={item}
                                        onClick={function() {
                                            openCategory(item)
                                        }}
                                    >
                                        {item}
                                    </button>
                                )
                            })}

                        </div>

                        <div className="bottom-category-extra">
                            <span>Discover more with</span>
                            <strong>ShopFlow</strong>
                        </div>

                    </section>
                )}

            </main>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-brand">
                    <h2>ShopFlow</h2>
                    <p>Explore products and find what you need.</p>
                </div>

                <div className="footer-bottom">
                    <span>© ShopFlow</span>
                    <span>Made for everyday shopping</span>
                </div>
            </footer>

        </div>
    )
}

export default Home