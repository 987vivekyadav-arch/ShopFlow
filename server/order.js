import mongoose from "mongoose";


const OrderSchema=
mongoose.Schema({


items:[{
productid:String,
name:String,
 quantity:Number,
price:Number,
image:String
 
}],

total:Number,
userid:String,

})

const OrderModel=mongoose.model("orders",OrderSchema)
export default OrderModel