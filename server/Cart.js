import mongoose from "mongoose";


const CartSchema=
mongoose.Schema({

userid:String,
products:[
    {
    productid:String,
    quantity:Number
   }
]



})

const CartModel=mongoose.model("cart",CartSchema)
export default CartModel