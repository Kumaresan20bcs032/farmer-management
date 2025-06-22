const User = require("../../models/user");
const { errorResponse, successResponse } = require("../../utils/responseHandler");

class DeleteUser {
    async delete(req, res) {
        try {

            const { id = "" } = req.user;

            const user = await User.findByIdAndDelete(id)

            if (!user) {
                return errorResponse(res, 400, "User not found.")
            }

            return successResponse(res, 200, "User deleted successfully.", user);
        }
        catch (error) {
            console.error("Error in delete user:", error);
            errorResponse(res, 500, error.message)
        }
    }
}

module.exports = new DeleteUser();