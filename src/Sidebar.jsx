import React from "react"
import { Link } from "react-router-dom"
import "./Sidebar.css"

function Sidebar({sidebar,setSidebar}){
return(
<div className="sidebar-container">

        <button
            className="sidebar-toggle"
            onClick={function(){
                if(sidebar===true){
                    setSidebar(false)
                }else{
                    setSidebar(true)
                }
            }}
        >
            {sidebar ? "×" : "☰"}
        </button>

        <div className={sidebar ? "sidebar-menu sidebar-open" : "sidebar-menu"}>

            <div className="sidebar-heading">
                <h2>ShopFlow</h2>
                <p>Your shopping space</p>
            </div>

            <div className="sidebar-divider"></div>

            <div className="sidebar-links">
                <Link
                    className="sidebar-link"
                    to="/"
                    onClick={function(){
                        setSidebar(false)
                    }}
                >
                    <span></span>
                    Home
                </Link>
               
<Link
                    className="sidebar-link"
                    to="/cart"
                    onClick={function(){
                        setSidebar(false)
                    }}
                >
                    <span></span>
                     Cart
                </Link>
                

<Link
                    className="sidebar-link"
                    to="/myorders"
                    onClick={function(){
                        setSidebar(false)
                    }}
                >
                    <span></span>
                    Orders
                </Link>

                

<Link
                    className="sidebar-link"
                    to="/wishlist"
                    onClick={function(){
                        setSidebar(false)
                    }}
                >
                    <span></span>
                    Wishlist
                </Link>

<Link
                    className="sidebar-link"
                    to="/showprofile"
                    onClick={function(){
                        setSidebar(false)
                    }}
                >
                    <span></span>
                    Profile
                </Link>

<br></br>




  <div className="sidebar-bottom">
                
                
            </div>


<Link
                    className="sidebar-link"
                    to="/login"
                    onClick={function(){
                        setSidebar(false)
                        localStorage.removeItem("token")
                    }}
                >
                    <span>⌂</span>
                     Logout
                </Link>




            </div>

          

        </div>

    </div>
)

}

export default Sidebar