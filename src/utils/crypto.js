const crypto = require("node:crypto");
const {
    CRYPTO_SECRET: secretKey,
    CRYPTO_FORMAT: format,
    CRYPTO_ALGORITHM: algorithm
} = process.env;


/**
 * @description This function is converting palin text to hexa decimal ecryption format
 * @param {*} rawData 
 * @returns encrypted token
 */
const encryptText = (rawData) => {
    try {
        const iv = crypto.randomBytes(12).toString('hex')
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
        let encrypted = cipher.update(rawData, format, 'hex')
        encrypted += cipher.final('hex')
        const authTag = cipher.getAuthTag().toString('hex')
        return iv + ':' + encrypted + ':' + authTag
    }
    catch (error) {
        console.error(error.message)
    }
}

/**
 * @description This function is converting cipher text to plain text
 * @param {*} encryptData 
 * @returns decrupted token
 */
const decryptText = (encryptData) => {
    try {
        const iv = encryptData.split(':')[0]
        const encrypt = encryptData.split(':')[1]
        const authTag = encryptData.split(':')[2]
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
        decipher.setAuthTag(Buffer.from(authTag, 'hex'))
        let decrypted = decipher.update(encrypt, 'hex', format)
        decrypted += decipher.final(format)
        return decrypted
    }
    catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    encryptText,
    decryptText
}