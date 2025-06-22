const Product = require("../../models/product");
const { successResponse, errorResponse } = require("../../utils/responseHandler");

class ListProduct {
    async product(req, res) {
        try {
            const { page = 1, limit = 10, search = "" } = req.query;

            //construct the dynamic options
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: { createdAt: -1 }
            }

            // construct the dynamic query.
            const query = {};

            if (search) {
                query.name = { $regex: search, $options: "i" }; // case-insensitive
            }

            const product = await Product.paginate(query, options)

            return successResponse(res, 200, "Product list fetched successfully.", product);
        } catch (error) {
            console.error("Error in fetching product:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new ListProduct();
