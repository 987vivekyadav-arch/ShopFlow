import React, { useEffect } from "react"
import { useParams ,useNavigate} from "react-router-dom"
import "./Products.css"
import Wishlist from "./shopflow.js"


function Products() {
    const { item } = useParams()
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
const navigate=useNavigate()

    useEffect(function() {
        setLoading(true)

        fetch("https://shopflow-wkvz.onrender.com/products/" + item, {
            method: "GET"
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setProducts(data)
            setLoading(false)
        })
        .catch(function(error) {
            console.log("Error:", error)
            setLoading(false)
        })
    }, [item])






    function categoryTitle() {
if(!item){
    return "Products"
}

        return item
            .replaceAll("-", " ")
            .replace(/\b\w/g, function(letter) {
                return letter.toUpperCase()
            })
    }

    return (
        <div className="products-page">

            <header className="products-header">
                <div>
                    <p className="products-eyebrow">SHOPFLOW COLLECTION</p>
                    <h1>{categoryTitle()}</h1>
                    <p className="products-subtitle">
                        Discover products selected for you.
                    </p>
                </div>

                <div className="products-total">
                    <span>{products.length}</span>
                    <p>Products</p>
                </div>
            </header>

            <section className="products-content">

                <div className="products-section-heading">
                    <div>
                        <h2>Explore {categoryTitle()}</h2>
                        <p>Find something you love.</p>
                    </div>
                </div>

                {loading && (
                    <div className="products-message">
                        Loading products...
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="products-message">
                        <h3>No products found</h3>
                        <p>There are no products in this category yet.</p>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="products-grid">

                        {products.map(function(product) {
                            return (



                                <div 
                                    className="products-card"
                               
                                    key={product._id || product.id}
                                    onClick={function(){
navigate("/singleproducts/"+product.id)
                                    }}
                                    
                                    
                                >
                                    <button onClick={function(e){
                                       e.stopPropagation()
                                        Wishlist(product)
                                    }}
                                    >♥</button>

                                    <div className="products-image">
                                        <img
                                            src={
                                                product.thumbnail ||
                                                product.image
                                            }
                                            alt={product.title || product.name}
                                            loading="lazy"
                                        />

                                        {product.discountPercentage > 0 && (
                                            <span className="products-discount">
                                                {Math.round(
                                                    product.discountPercentage
                                                )}% OFF
                                            </span>
                                        )}
                                    </div>

                                    <div className="products-info">

                                        <span className="products-category">
                                            {product.category || categoryTitle()}
                                        </span>

                                        <h3>
                                            {product.title || product.name}
                                        </h3>

                                        <div className="products-rating">
                                            <span>★</span>
                                            {product.rating || "New"}
                                        </div>

                                        <div className="products-bottom">
                                            <div className="products-price">
                                                <span>₹{product.price}</span>
                                            </div>

                                            <button
                                                className="products-add-button"
                                                onClick={function() {
                                                    console.log(
                                                        "Selected product:",
                                                        product
                                                    )
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
                )}

            </section>

            <footer className="products-footer">
                <h3>ShopFlow</h3>
                <p>Your space to discover something new.</p>
            </footer>

        </div>
    )
}

export default Products