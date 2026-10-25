import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  mongoose  from "mongoose";
import verify from "./verify.js"
import jwt from "jsonwebtoken"
import UsersModel from "./users.js";
import ProductsModel from "./products.js"
import CartModel from "./Cart.js";
import OrderModel from "./order.js"
import FinalModel from "./final.js";
import Razorpay from "razorpay"
import {createHmac}from "node:crypto"
import PaymentModel from "./payment.js";
import WishModel from "./wishlist.js";
import ProfileModel from "./profile.js";

const app=express()


dotenv.config()
mongoose.connect(process.env.MONGO_URI)
const razorpay=new Razorpay({
key_id:process.env.RAZORPAY_KEY_ID,
key_secret:process.env.RAZORPAY_KEY_SECRET
})

app.use(express.json({limit:"10mb"}))
app.use(cors())

{/*-----------------------------------------------------------Register-----------------------------------------------------------*/}

app.post("/register",function(req,res){
    UsersModel.create(req.body)
    .then(function(data){
        console.log(data)
res.json(data)
    })
})



{/*-----------------------------------------------------------Login-----------------------------------------------------------*/}

app.post("/login",function(req,res){
    UsersModel.findOne(req.body)
    .then(function(data){
        console.log(data)
const token=jwt.sign({userid:data._id},"secret")
res.json({token:token})
    })
})

{/*-----------------------------------------------------------Home-----------------------------------------------------------*/}

app.post("/home",function(req,res){
    ProductsModel.insertMany(req.body.products)
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

{/*-----------------------------------------------------------Products-----------------------------------------------------------*/}

app.get("/products/:item",function(req,res){
    ProductsModel.find({category:req.params.item})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

{/*-----------------------------------------------------------Single-Products-----------------------------------------------------------*/}

app.get("/singleproducts/:id",function(req,res){
    ProductsModel.findOne({id:Number(req.params.id)})
    .then(function(product){
 return  ProductsModel.find({category:product.category,_id:{$ne:product._id}})
   .then(function(category){
res.json({
    product:product,
    category:category
})
})
})
})


{/*-----------------------------------------------------------Cart-----------------------------------------------------------*/}

app.post("/cart",verify,function(req,res){
   CartModel.findOne({userid:req.userid})
   .then(function(cart){
    if(cart){

const product=cart.products.find(function(item){
  return  item.productid===req.body.productid
})
if(product){
    product.quantity+=(Number(req.body.quantity)||1)
    
}else{


cart.products.push({
    productid:req.body.productid,
    quantity:Number(req.body.quantity)
})
}
return cart.save()
   }
return CartModel.create({
    userid:req.userid,
    products:[{
        productid:req.body.productid,
        qantity:req.body.quantity
    }]
})

})
.then(function(data){
    console.log(data)
res.json(data)
})
})

app.get("/cart", verify, function(req, res) {
    CartModel.findOne({ userid: req.userid })
    .then(function(cart) {

        if (!cart) {
            return res.json([])
        }

        return Promise.all(cart.products.map(function(item) {
            return ProductsModel.findById(item.productid)
            .then(function(product) {

                if (!product) {
                    console.log("PRODUCT NOT FOUND:", item.productid)
                    return null
                }

                return {
                    ...product.toObject(),
                    quantity: item.quantity
                }
            })
        }))
        .then(function(data) {
            var validProducts = data.filter(function(item) {
                return item !== null
            })

            console.log("Cart products:", validProducts)
            res.json(validProducts)
        })
    })
    .catch(function(error) {
        console.log("Cart error:", error)
        res.status(500).json({ message: "Could not load cart" })
    })
})

app.delete("/deletecart/:id",verify,function(req,res){
    CartModel.findOneAndUpdate({userid:req.userid},{ $pull:{products:{productid:req.params.id}}},{new:true})
    .then(function(data){
        console.log("delete:",data)
        res.json(data)
    })
})




{/*-----------------------------------------------------------Order-----------------------------------------------------------*/}

app.post("/order",verify,function(req,res){
    OrderModel.create({...req.body,userid:req.userid})
    .then(function(data){
        console.log("order:",data)
res.json(data)
    })
})

app.get("/order",verify,function(req,res){
    OrderModel.findOne({userid:req.userid})
    .sort({_id:-1})
    .then(function(data){
        console.log("orderget:",data)
res.json(data)
    })
})

app.post("/create-razorpay-order",function(req, res) {

    var total = Number(req.body.total)

    if (!Number.isFinite(total) || total <= 0) {
        return res.status(400).json({ message: "Invalid total" })
    }

    razorpay.orders.create({
        amount: Math.round(total * 100),
        currency: "INR",
        receipt: "shopflow_" + Date.now()
    })
    .then(function(data) {
        res.json({
            id: data.id,
            amount: data.amount,
            currency: data.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        })
    })
    .catch(function(error) {
        console.log(error)
        res.status(500).json({ message: "Could not create order" })
    })
})


app.post("/verify-razorpay-payment",verify, function(req, res) {

    var items = req.body.items
    var address = req.body.address
    var paymentMethod = req.body.paymentMethod
    var total = Number(req.body.total)
    var payment = req.body.payment

    if (!payment || !payment.razorpay_order_id ||
        !payment.razorpay_payment_id || !payment.razorpay_signature) {
        return res.status(400).json({ message: "Missing payment details" })
    }

    var body = payment.razorpay_order_id + "|" +
        payment.razorpay_payment_id

    var signature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex")

    if (signature !== payment.razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" })
    }

    razorpay.orders.fetch(payment.razorpay_order_id)
    .then(function(orderData) {

        if (orderData.amount !== Math.round(total * 100) ||
            orderData.currency !== "INR") {
            throw new Error("Order amount mismatch")
        }

        return razorpay.payments.fetch(payment.razorpay_payment_id)
    })
    .then(function(paymentData) {

        if (paymentData.status !== "captured" ||
            paymentData.order_id !== payment.razorpay_order_id ||
            paymentData.amount !== Math.round(total * 100)) {
            throw new Error("Payment not captured or amount mismatch")
        }

        return PaymentModel.create({
            items: items,
            address: address,
            paymentMethod: paymentMethod,
            total: total,
            razorpaypaymentid: payment.razorpay_payment_id,
            razorpayorderid: payment.razorpay_order_id,
            status: "captured",
            userid:req.userid
        })
    })
    .then(function(savedData) {
        res.json({
            message: "Order saved successfully",
            order: savedData
        })
    })
    .catch(function(error) {
        console.log(error)
        res.status(400).json({
            message: "Verification or saving failed"
        })
    })
})

{/*-----------------------------------------------------------MY-Order-----------------------------------------------------------*/}

app.get("/myorders",verify,function(req,res){
    PaymentModel.find({userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})


{/*-----------------------------------------------------------Wishlist-----------------------------------------------------------*/}
app.post("/wishlist",verify,function(req,res){
    WishModel.create({...req.body,userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

app.get("/wishlist",verify,function(req,res){
    WishModel.find({userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

app.delete("/deletewishlist/:id",verify,function(req,res){
    WishModel.findOneAndDelete({userid:req.userid,_id:req.params.id})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})


{/*-----------------------------------------------------------profile-----------------------------------------------------------*/}

app.get("/profile",verify,function(req,res){
    UsersModel.findById(req.userid)
    .then(function(data){
        console.log("profile:",data)
res.json(data)
    })
})

app.post("/profile",verify,function(req,res){
ProfileModel.find({userid:req.userid})
.then(function(profile){
if(profile){
    return res.json({
     message:"Profile already exists",
       profile:profile
    });
}

    ProfileModel.create({...req.body,userid:req.userid})
    .then(function(data){
        console.log("profilesave:",data)
res.json(data)
    })
    })
})

{/*-----------------------------------------------------------Show-profile-----------------------------------------------------------*/}


app.get("/showprofile",verify,function(req,res){
    ProfileModel.findOne({userid:req.userid})
    .then(function(data){

        console.log("profile:",data)
res.json(data)
    })
})

app.listen(process.env.PORT||5000)