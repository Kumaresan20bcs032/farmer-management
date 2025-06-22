const Farmer = require("../../models/farmer");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class CreateFarmer {
    async create(req, res) {
        try {

            const farmer = await Farmer.create(req.body);

            return successResponse(res, 200, "Farmer created successfully.", farmer);
        }
        catch (error) {
            console.error("Error in creating farmer:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new CreateFarmer()