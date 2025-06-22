const User = require("../models/user");
const { errorResponse } = require("../utils/responseHandler");
const jwtToken = require("../utils/jwt");


class UserMiddleware {
    async validate(req, res, next) {
        try {

            const authorization = req.headers["authorization"]
            if (!authorization) {
                return errorResponse(res, 401, "Un authorized access, Please provide a token.");
            }

            if (!authorization?.startsWith("Bearer")) {
                return errorResponse(res, 401, "Un authorized access, Please provide a beared token.");
            }

            const accessToken = authorization?.split(" ")[1];


            const decode = await jwtToken.decodeAccessToken(accessToken)


            const user = await User.findOne({ _id: decode?.id })

            if (!user) {
                return errorResponse(res, 400, "User not found.")
            }

            req.user = decode;

            next();
        }
        catch (error) {
            console.error("Error in user middleware:", error);
            return errorResponse(res, 500, error?.message ?? "Internal server error.")
        }
    }
}


module.exports = new UserMiddleware()