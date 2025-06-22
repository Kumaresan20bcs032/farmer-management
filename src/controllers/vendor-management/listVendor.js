const Vendor = require("../../models/vendor");
const { successResponse, errorResponse } = require("../../utils/responseHandler");

class ListVendor {
    async list(req, res) {
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

            const vendor = await Vendor.paginate(query, options)

            return successResponse(res, 200, "Vendor list fetched successfully.", vendor);
        } catch (error) {
            console.error("Error in fetching vendor:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new ListVendor();
