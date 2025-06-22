const Product = require("../../models/product");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class CreateProduct {
    async product(req, res) {
        try {

            const { name } = req.body;

            const isExistProduct = await Product.findOne({ name })

            if (isExistProduct) {
                return errorResponse(res, 400, "Product already exists.")
            }

            const product = await Product.create(req.body);

            return successResponse(res, 200, "Product created successfully.", product);
        }
        catch (error) {
            console.error("Error in creating product:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new CreateProduct()