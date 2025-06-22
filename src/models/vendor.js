const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @Schema This schema is related to vendor.
 */
const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    totalamount: {
        type: Number,
    },
    paid: {
        type: Number,
    },
    pending: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        trim: true,
        enum: ["Paid", "Partial"]
    }
}, {
    versionKey: false,
    timestamps: true
})

VendorSchema.plugin(mongoosePaginate);
const Vendor = mongoose.model("vendor", VendorSchema);

module.exports = Vendor;