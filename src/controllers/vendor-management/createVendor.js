const Vendor = require("../../models/vendor");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class CreateVendor {
    async vendor(req, res) {
        try {

            const { name, totalamount = 0, paid = 0 } = req.body;

            const isExistVendor = await Vendor.findOne({ name })

            if (isExistVendor) {
                return errorResponse(res, 400, "Vendor already exists.")
            }

            if (paid > totalamount) {
                return errorResponse(res, 400, "Paid amount should be lessthan or equal to total amount");
            }

            const pendingAmount = totalamount - paid;

            let status = "Partial";

            if (totalamount == paid) {
                status = "Paid";
            }
            const vendor = await Vendor.create({ ...req.body, pending: pendingAmount, status });

            return successResponse(res, 200, "Vendor created successfully.", vendor);
        }
        catch (error) {
            console.error("Error in creating vandor:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new CreateVendor()