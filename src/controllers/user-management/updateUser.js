const User = require("../../models/user");
const { decryptHash } = require("../../utils/hash");
const { errorResponse, successResponse } = require("../../utils/responseHandler");

class UpdateUser {
    async update(req, res) {
        try {

            const { newPassword = "" } = req.params;
            const { id } = req.user;

            const user = await User.findById(id)

            if (!user) {
                return errorResponse(res, 400, "User not found.")
            }

            if (newPassword) {
                req.body.password = decryptHash(newPassword)
            }

            const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password")

            return successResponse(res, 200, "User updated successfully.", updateUser);
        }
        catch (error) {
            console.error("Error in delete user:", error);
            errorResponse(res, 500, error.message)
        }
    }
}

module.exports = new UpdateUser();