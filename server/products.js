import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    thumbnail: String,
    images: Array,
    tags: Array,
    availabilityStatus: String,
    sku: String,
    weight: Number,
    warrantyInformation: String,
    shippingInformation: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
    dimensions: Object,
    reviews: Array,
    meta: Object
});

const ProductsModel = mongoose.model("products", ProductsSchema);

export default ProductsModel;