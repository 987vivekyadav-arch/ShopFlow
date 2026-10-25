import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"

import Layout from "./Layout"

import Register from "./Register"
import Login from "./Login"

import Home from "./Home"
import Products from "./Products"

import SingleProducts from "./SingleProducts"
import Cart from "./Cart"

import Order from "./Order"
import Myorders from "./Myorders"

import Wishlist from "./Wishlist"
import Profile from "./Profile"

import Showprofile from "./Showprofile"


function App(){
  return(
    

<BrowserRouter>
 

<Routes>

<Route element={<Layout/>}>

<Route  path="/"
element={<Home/>}
  />

<Route  path="/register"
element={<Register/>}
  />

<Route  path="/login"
element={<Login/>}
  />

<Route  path="/products/:item"
element={<Products/>}
  />

<Route  path="/singleproducts/:id"
element={<SingleProducts/>}
  />

<Route  path="/cart"
element={<Cart/>}
  />

  <Route  path="/order"
element={<Order/>}
  />

   <Route  path="/myorders"
element={<Myorders/>}
  />

   <Route  path="/wishlist"
element={<Wishlist/>}
  />

  <Route  path="/profile"
element={<Profile/>}
  />

<Route  path="/showprofile"
element={<Showprofile/>}
  />

</Route>
</Routes>
</BrowserRouter>






  )

}export default App;