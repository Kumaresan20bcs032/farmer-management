const Product = require("../../models/product");
const { successResponse, errorResponse } = require("../../utils/responseHandler");

class UpdateProduct {
    async update(req, res) {
        try {
            const { id } = req.params;


            const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

            if (!product) {
                return errorResponse(res, 400, "Product not found.")
            }

            return successResponse(res, 200, "Product updated successfully.", product);
        } catch (error) {
            console.error("Error in updating product:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new UpdateProduct();
