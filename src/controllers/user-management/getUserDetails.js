const User = require("../../models/user");
const { errorResponse, successResponse } = require("../../utils/responseHandler");

class GetUserDetails {
    async get(req, res) {
        try {

            const { id = "" } = req.user

            const user = await User.findById(id).select("-password")

            if (!user) {
                return errorResponse(res, 400, "User not found.")
            }

            return successResponse(res, 200, "User details fetched successfully.", user);
        }
        catch (error) {
            console.error("Error in user details:", error);
            errorResponse(res, 500, error.message)
        }
    }
}

module.exports = new GetUserDetails();