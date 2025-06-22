const jwt = require('jsonwebtoken');
const { encryptText, decryptText } = require("./crypto");
const {
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN
} = process.env;


/**
 * @description To create the jwt access and refresh tokens
 */

class JwtToken {
    async encodeAccessToken(data) {

        try {
            const accessToken = await jwt.sign(data, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN });
            return accessToken;
        }
        catch (error) {
            throw error;
        }

    }

    async encodeRefreshToken(data) {

        try {
            const refreshToken = await jwt.sign(data, JWT_REFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN });
            const encryptToken = encryptText(refreshToken);
            return encryptToken;
        }
        catch (error) {
            throw error;
        }

    }

    async decodeAccessToken(token) {

        try {
            const decode = await jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
            return decode
        }
        catch (error) {
            throw error;
        }

    }

    async decodeRefreshToken(token) {

        try {
            const decryptToken = decryptText(token);
            const decode = await jwt.verify(decryptToken, JWT_REFRESH_TOKEN_SECRET);
            return decode
        }
        catch (error) {
            throw error;
        }

    }
}

module.exports = new JwtToken();