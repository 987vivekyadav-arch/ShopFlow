import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Wishlist.css"

function Wishlist() {
const [wishlist, setWishlist] = React.useState([])
const navigate = useNavigate()

useEffect(function() {
    fetch("http://localhost:5000/wishlist", {
        method: "GET",
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log("wishlist:", data)
        setWishlist(data)
    })
}, [])


function Delete(id){
    fetch("http://localhost:5000/deletewishlist/"+id,{
        method:"DELETE",
        headers:{"authorization":"Bearer "+localStorage.getItem("token")}
    })
    .then(function(response){
return response.json()
    })
     .then(function(data){
      const wish=wishlist.filter(function(item){
if(item._id!==id){return true}{return false}
      })
      setWishlist(wish)
    })
}





return (
    <div className="wishlist-page">

        <div className="wishlist-header">
            <div>
                <span className="wishlist-subtitle">YOUR SHOPFLOW ACCOUNT</span>
                <h1>My Wishlist <span>♡</span></h1>
                <p>Your favourite products, all in one place.</p>
            </div>

            <div className="wishlist-count">
                <strong>{wishlist.length}</strong>
                <span>Saved Items</span>
            </div>
        </div>

        {wishlist.length === 0 ? (
            <div className="wishlist-empty">
                <div className="wishlist-empty-icon">♡</div>
                <h2>Your wishlist is empty</h2>
                <p>Save products you love and find them here later.</p>
                <button
                    className="wishlist-shop-button"
                    onClick={function() {
                        navigate("/")
                    }}
                >
                    Explore Products →
                </button>
            </div>
        ) : (
            <div className="wishlist-grid">
                {wishlist.map(function(item) {
                    return (
                        <div className="wishlist-card" key={item._id}>

                            <div className="wishlist-image">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    onClick={function() {
                                        navigate("/singleproducts/" + item.productid)
                                    }}
                                />

                                <button className="wishlist-heart"
                                onClick={function(){
                                    Delete(item._id)
                                }}
                                >♥</button>
                            </div>

                            <div className="wishlist-info">
                                <h3>{item.name}</h3>

                                <strong className="wishlist-price">
                                    ₹{Number(item.price).toFixed(2)}
                                </strong>

                                <button
                                    className="wishlist-view-button"
                                    onClick={function() {
                                      navigate("/singleproduct/"+item.id)
                                        
                                    }}
                                >
                                    View Product →
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        )}

    </div>
)

}

export default Wishlist