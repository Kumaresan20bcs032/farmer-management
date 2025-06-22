const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @Schema This schema is related to product.
 */
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    symbol: {
        type: String,
        trim: true,
        default: "₹"
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false,
    timestamps: true
})

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model("product", ProductSchema);

module.exports = Product;