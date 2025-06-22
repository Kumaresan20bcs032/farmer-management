const User = require("../../models/user");
const { encryptHash } = require("../../utils/hash");
const { errorResponse, successResponse } = require("../../utils/responseHandler");

class CreateUser {
    async user(req, res) {
        try {

            const { email = "", password = "" } = req.body;

            const user = await User.findOne({ email })

            if (user) {
                return errorResponse(res, 400, "User already exists.")
            }

            req.body.password = await encryptHash(password)

            const createUser = await User.create(req.body)

            const result = createUser.toObject()

            return successResponse(res, 200, "User created successfully.", result);
        }
        catch (error) {
            console.error("Error in creating user:", error);
            errorResponse(res, 500, error.message)
        }
    }
}

module.exports = new CreateUser();