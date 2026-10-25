import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./SingleProducts.css"

function SingleProducts() {
const navigate = useNavigate()
const { id } = useParams()

const [singleproducts, setSingleProducts] = React.useState({})
const [category, setCategory] = React.useState([])

const[quantity,setQuantity]=React.useState(1)



useEffect(function() {
    fetch("https://shopflow-wkvz.onrender.com/singleproducts/" + id, {
        method: "GET"
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        setSingleProducts(data.product)
        setCategory(data.category)
    })
}, [id])

return (
    <div className="single-page">

        <div className="single-breadcrumb">
            <span onClick={function() {
                navigate("/")
            }}>Home</span>
            <span> / </span>
            <span>{singleproducts.category}</span>
            <span> / </span>
            <span>{singleproducts.title}</span>
        </div>

        <div className="single-product">

            <div className="single-image">
                <img
                    src={singleproducts.thumbnail || singleproducts.image}
                    alt={singleproducts.title || singleproducts.name}
                />
            </div>

            <div className="single-info">
                <p className="single-category">
                    {singleproducts.category}
                </p>

                <h1>{singleproducts.title || singleproducts.name}</h1>

                <p className="single-rating">
                    ★ {singleproducts.rating || "New"}
                </p>

                <p className="single-description">
                    {singleproducts.description}
                </p>

                <div className="single-price">
                    ₹{singleproducts.price}
                </div>

                {singleproducts.discountPercentage > 0 && (
                    <p className="single-discount">
                        {Math.round(singleproducts.discountPercentage)}% OFF
                    </p>
                )}

                <button onClick={function(){
                setQuantity(quantity+1) 
                }}
                >+</button>
<div>{quantity}</div>
                 <button onClick={function(){
                    if(quantity>1){return setQuantity(quantity-1) }
                }}
                >-</button>
<br></br>

                <button
                    className="single-cart-button"
                    onClick={function() {
                        fetch("https://shopflow-wkvz.onrender.com/cart",{
                            method:"POST",
                            headers:{"Content-Type":"application/json","authorization":"Bearer "+localStorage.getItem("token")},
                            body:JSON.stringify({
                                productid:singleproducts._id,
                                quantity:quantity
                            })
                        })
                        .then(function(response){
                           return response.json()
                        })
                         .then(function(data){
                           console.log(data)
                           navigate("/cart")
                        })
                        
                    }}
                >
                    Add to cart
                </button>

                <div className="single-benefits">
                    <h3>Why shop from ShopFlow?</h3>
                    <p>✓ Discover products from different categories.</p>
                    <p>✓ Explore product details before buying.</p>
                    <p>✓ Find products that suit your needs.</p>
                </div>
            </div>
        </div>

        <div className="related-section">
            <h2>Similar Products</h2>
            <p className="related-subtitle">
                More products from {singleproducts.category}
            </p>

            <div className="related-grid">
                {category.map(function(product) {
                    return (
                        <div className="related-card" key={product._id}
                        onClick={function(){navigate("/singleproducts/"+product.id)}}>
                            <div className="related-image">
                                <img
                                    src={product.thumbnail || product.image}
                                    alt={product.title || product.name}
                                />
                            </div>

                            <div className="related-info">
                                <h3>{product.title || product.name}</h3>

                                <p className="related-rating">
                                    ★ {product.rating || "New"}
                                </p>

                                <p className="related-price">
                                    ₹{product.price}
                                </p>

                                <button
                                    className="related-button"
                                    onClick={function() {
                                        navigate("/singleproducts/" + product._id)
                                    }}
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    </div>
)

}

export default SingleProducts