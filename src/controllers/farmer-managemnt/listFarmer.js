const Farmer = require("../../models/farmer");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class ListFarmer {
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
            const farmer = await Farmer.paginate(query, options)
            return successResponse(res, 200, "Farmer list fetched successfully.", farmer);
        }
        catch (error) {
            console.error("Error in updating farmer:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new ListFarmer()