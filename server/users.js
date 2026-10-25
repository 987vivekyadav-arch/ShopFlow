import mongoose from "mongoose";


const UsersSchema=
mongoose.Schema({

name:String,
email:String,
password:String,


})

const UsersModel=mongoose.model("users",UsersSchema)
export default UsersModel