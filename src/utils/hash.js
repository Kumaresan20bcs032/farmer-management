const crypto = require("node:crypto");
const { SECRET_KEY } = process.env;


/**
 * @description It encrypts the text with hashable format which means human cannot readable format
 */
const encryptHash = (rawData) => {
    try {
        const encrypt = crypto.createHash('sha256', SECRET_KEY)
            .update(rawData).digest('hex')
        return encrypt
    }
    catch (error) {
        console.error(error)
    }
}


/**
 * @description It encrypts the text with hashable format  and verify the encrypted text
 */
const decryptHash = (rawData, encryptData) => {
    try {
        const hash = crypto.createHash('sha256', SECRET_KEY)
            .update(rawData).digest('hex')

        if (hash === encryptData) {
            return true
        }
        return false
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = {
    encryptHash,
    decryptHash
}