const Vendor = require("../../models/vendor");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class DeleteVendor {
    async delete(req, res) {
        try {

            const { id = "" } = req.params;

            const vendor = await Vendor.findByIdAndDelete(id)

            if (!vendor) {
                return errorResponse(res, 400, "Vendor not found.")
            }

            return successResponse(res, 200, "Vendor deleted successfully.", vendor);
        }
        catch (error) {
            console.error("Error in deleting vandor:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new DeleteVendor()