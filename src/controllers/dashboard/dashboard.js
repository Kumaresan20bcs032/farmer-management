const Product = require("../../models/product");
const Farmer = require("../../models/farmer");
const Vendor = require("../../models/vendor");
const { errorResponse, successResponse } = require("../../utils/responseHandler");

class DashBoardDeatails {
    async dashboard(req, res) {
        try {

            const totalFarmers = await Farmer.countDocuments({});
            const totalFarmersProductPendingAmount = await Farmer.countDocuments({ status: "Pending" })
            const totalFarmersProductReceivedAmount = await Farmer.countDocuments({ status: "Paid" })

            const totalVendorOrders = await Vendor.countDocuments({})
            const totalVendorPaidAmount = await Vendor.countDocuments({ status: "Paid" })
            const totalVendorPendingAmount = await Vendor.countDocuments({ status: "Partial" })

            const result = {
                farmersTotal: totalFarmers,
                farmersPaidAmount: totalFarmersProductReceivedAmount,
                farmersPendingAmount: totalFarmersProductPendingAmount,
                vendorsTotal: totalVendorOrders,
                vendorsPaidAmount: totalVendorPaidAmount,
                vendorsPendingAmount: totalVendorPendingAmount
            }

            return successResponse(res, 200, "Dashboard details fetched successfully.", result)
        }
        catch (error) {
            console.log("Error in getting dashboard details:", error);
            return errorResponse(res, 500, error.message)
        }
    }
}

module.exports = new DashBoardDeatails()