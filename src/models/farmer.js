const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @Schema This schema is related to product.
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    status: {
        type: String,
        enum: ["Pending", "Paid"]
    }
}, {
    _id: 0,
    versionKey: 0
})
const FarmerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    area: {
        type: String
    },
    products: [productSchema]
}, {
    versionKey: false,
    timestamps: true
})

FarmerSchema.plugin(mongoosePaginate);
const Farmer = mongoose.model("farmer", FarmerSchema);

module.exports = Farmer;