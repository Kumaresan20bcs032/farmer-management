const Vendor = require("../../models/vendor");
const { successResponse, errorResponse } = require("../../utils/responseHandler");


class UpdateVendor {
    async update(req, res) {
        try {

            const { id = "" } = req.params;

            const { balancePay = 0 } = req.body;


            const vendor = await Vendor.findById(id)

            if (!vendor) {
                return errorResponse(res, 400, "Vendor not found.")
            }

            const totalAmount = vendor?.totalamount;
            let paidAmount = vendor?.paid;
            let pendingAmount = vendor?.pending;

            if ((balancePay > totalAmount)) {
                return errorResponse(res, 400, "Paid amount cannot exceed the vendor's total amount.");
            }


            if (balancePay > pendingAmount) {
                return errorResponse(res, 400, "Balance pay must be lessthan or equal to pending amount.")
            }

            paidAmount += balancePay;
            pendingAmount = Math.max(0, pendingAmount - balancePay);

            const updateVendor = await Vendor.findByIdAndUpdate(id,
                {
                    ...req.body,
                    paid: paidAmount,
                    pending: pendingAmount
                },
                { new: true })

            return successResponse(res, 200, "Vendor updated successfully.", updateVendor);
        }
        catch (error) {
            console.error("Error in updating vandor:", error);
            return errorResponse(res, 500, error.message);
        }
    }
}

module.exports = new UpdateVendor()