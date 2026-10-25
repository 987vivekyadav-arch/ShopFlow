import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({

    userid:String,
  items: Array,
    address: String,
    total: Number,
    payment: String,
    paymentMethod: String,
    razorpaypaymentid: String,
    razorpayorderid: String,
    status: String
})

const PaymentModel = mongoose.model("Payment", PaymentSchema)
export default PaymentModel;