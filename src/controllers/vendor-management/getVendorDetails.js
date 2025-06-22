const Vendor = require("../../models/vendor");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class GetVendorDetails {
    async get(req, res) {
        try {

            const { id = "" } = req.params;

            const vendor = await Vendor.findById(id)

            if (!vendor) {
                return errorResponse(res, 400, "Vendor not found.")
            }

            return successResponse(res, 200, "Vendor details fetched successfully.", vendor);
        }
        catch (error) {
            console.error("Error in getting vandor details:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new GetVendorDetails()