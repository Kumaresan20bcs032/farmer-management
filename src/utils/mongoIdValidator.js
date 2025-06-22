const Joi = require("joi");
const { errorResponse, successResponse } = require("./responseHandler");

/**
 * @description This class handles to check the valid mongodb id or not in incoming api path params
 */
class MongoIdValidator {
    constructor() {
        this.schema = {
            id: Joi.object({
                id: Joi.string().hex().length(24).required().error(new Error("Incorrect object id"))
            })
        }
    }

    validate = (schemaName) => {
        return (req, res, next) => {
            const { error } = this.schema[schemaName].validate(req.params);
            if (error) {
                const message = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return errorResponse(res, 400, message);
            }
            next();
        }
    }

    id = this.validate("id")
}


module.exports = new MongoIdValidator();




