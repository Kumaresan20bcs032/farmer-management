const Farmer = require("../../models/farmer");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class DeleteFarmerDetails {
    async delete(req, res) {
        try {

            const { id } = req.params
            const farmer = await Farmer.findByIdAndDelete(id);

            return successResponse(res, 200, "Farmer details deleted successfully.", farmer);
        }
        catch (error) {
            console.error("Error in deleting farmer:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new DeleteFarmerDetails()