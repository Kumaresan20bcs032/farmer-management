const Farmer = require("../../models/farmer");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class UpdateFarmer {
    async update(req, res) {
        try {

            const { id } = req.params
            const farmer = await Farmer.findByIdAndUpdate(id, req.body, { new: true });

            return successResponse(res, 200, "Farmer updated successfully.", farmer);
        }
        catch (error) {
            console.error("Error in updating farmer:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new UpdateFarmer()