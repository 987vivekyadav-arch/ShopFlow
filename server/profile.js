import mongoose from "mongoose";


const ProfileSchema=
mongoose.Schema({

   userid:String, 
 name: String,
                email: String,
                phone: String,
                address: String,
                image: String


})

const ProfileModel=mongoose.model("profile",ProfileSchema)
export default ProfileModel