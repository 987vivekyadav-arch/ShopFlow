import mongoose from "mongoose";


const FinalSchema=
mongoose.Schema({

items:[{
productid:String,
name:String,
 quantity:Number,
 
}],

total:Number,
address:String,
payment:String


})

const FinalModel=mongoose.model("final",FinalSchema)
export default FinalModel