const User = require("../../models/user");
const { decryptHash } = require("../../utils/hash");
const jwtToken = require("../../utils/jwt");
const { errorResponse, successResponse } = require("../../utils/responseHandler");

class LoginUser {
    async login(req, res) {
        try {

            const { email = "", password = "" } = req.body;

            const user = await User.findOne({ email })
            console.log("user:", email)

            if (!user) {
                return errorResponse(res, 400, "Email not found.")
            }

            
            if (!decryptHash(password, user.password)) {
                return errorResponse(res, 400, "Invalid password.")
            }

            const token = await jwtToken.encodeAccessToken(
                {
                    id: user?._id,
                    email: user?.email
                }
            )

            const result = await User.findById(user?._id).select("-password")


            return successResponse(res, 200, "User deleted successfully.", { user: result, session: token });
        }
        catch (error) {
            console.error("Error in delete user:", error);
            errorResponse(res, 500, error.message)
        }
    }
}

module.exports = new LoginUser();