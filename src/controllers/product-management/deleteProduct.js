const Product = require("../../models/product");
const { successResponse, errorResponse } = require("../../utils/responseHandler");

class DeleteProduct {
    async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return errorResponse(res, 404, "Product not found.");
            }

            return successResponse(res, 200, "Product deleted successfully.", deletedProduct);
        } catch (error) {
            console.error("Error in deleting product:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new DeleteProduct();
