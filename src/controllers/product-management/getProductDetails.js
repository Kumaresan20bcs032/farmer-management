const Product = require("../../models/product");
const { successResponse, errorResponse } = require("../../utils/responseHandler");

class GetProductDetails {
    async get(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findById(id);

            if (!product) {
                return errorResponse(res, 404, "Product not found.");
            }

            return successResponse(res, 200, "Product details fetched successfully.", product);
        } catch (error) {
            console.error("Error in deleting product:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new GetProductDetails();
