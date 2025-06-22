const Farmer = require("../../models/farmer");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class GetFarmerDetails {
    async get(req, res) {
        try {

            const { id } = req.params
            const farmer = await Farmer.findById(id);

            return successResponse(res, 200, "Farmer details retrieved successfully.", farmer);
        }
        catch (error) {
            console.error("Error in getting farmer:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new GetFarmerDetails()