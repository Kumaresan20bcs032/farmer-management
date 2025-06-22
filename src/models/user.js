const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @Schema This schema is related to user.
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
})

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model("user", UserSchema);

module.exports = User;