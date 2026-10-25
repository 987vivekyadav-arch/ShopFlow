import mongoose from "mongoose";


const WishSchema=
mongoose.Schema({


 userid:String ,  
productid:String,
name:String,
price:Number,
image:String,


})

const WishModel=mongoose.model("wish",WishSchema)
export default WishModel