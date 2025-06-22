const Joi = require("joi");
const { errorResponse } = require("../utils/responseHandler");


/**
 * To validate all the incoming body of product data
 */
class ProductValidator {

    pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    constructor() {
        this.schema = {
            create: Joi.object({
                name: Joi.string().required(),
                amount: Joi.number().integer().required(),
                image: Joi.string(),
                symbol: Joi.string(),
                quantity: Joi.number().required().messages({
                    'number.base': 'Quantity must be a number.',
                    'number.empty': 'Quantity cannot be empty.',
                    'any.required': 'Quantity is required.',
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            }),
            update: Joi.object({
                name: Joi.string(),
                amount: Joi.number().integer(),
                image: Joi.string(),
                symbol: Joi.string(),
                quantity: Joi.number().messages({
                    'number.base': 'Quantity must be a number.',
                    'number.empty': 'Quantity cannot be empty.',
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            }),


        }
    }

    validate = (schemaName) => {
        return (req, res, next) => {
            const { error } = this.schema[schemaName].validate(req.body);
            if (error) {
                console.error("Product validation error:", error);
                const message = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return errorResponse(res, 400, message);
            }
            next();
        }
    }

    create = this.validate("create")
    update = this.validate("update")
}

module.exports = new ProductValidator()