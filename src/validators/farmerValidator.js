const Joi = require("joi");
const { errorResponse } = require("../utils/responseHandler");

class FarmerValidator {
    constructor() {
        this.statusEnum = ["Pending", "Paid"];

        // Product schema inside farmer
        const productJoiSchema = Joi.object({
            name: Joi.string().trim().required().messages({
                'string.base': 'Product name must be a string.',
                'any.required': 'Product name is required.'
            }),
            amount: Joi.number().required().messages({
                'number.base': 'Amount must be a number.',
                'any.required': 'Amount is required.'
            }),
            status: Joi.string().valid(...this.statusEnum).required().messages({
                'any.only': `Status must be one of ${this.statusEnum.join(', ')}.`,
                'any.required': 'Product status is required.'
            })
        });

        this.schema = {
            create: Joi.object({
                name: Joi.string().trim().required().messages({
                    'string.base': 'Farmer name must be a string.',
                    'any.required': 'Farmer name is required.'
                }),
                area: Joi.string().trim().required().messages({
                    'string.base': 'Area must be a string.',
                    'any.required': 'Area is required.'
                }),
                products: Joi.array().items(productJoiSchema).min(1).required().messages({
                    'array.base': 'Products must be an array.',
                    'array.min': 'At least one product is required.',
                    'any.required': 'Products field is required.'
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            }),

            update: Joi.object({
                name: Joi.string().trim(),
                area: Joi.string().trim(),
                products: Joi.array().items(productJoiSchema).messages({
                    'array.base': 'Products must be an array.'
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            })
        };
    }

    validate = (schemaName) => {
        return (req, res, next) => {
            const { error } = this.schema[schemaName].validate(req.body);
            if (error) {
                console.error("Farmer validation error:", error);
                const message = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return errorResponse(res, 400, message);
            }
            next();
        };
    };

    create = this.validate("create");
    update = this.validate("update");
}

module.exports = new FarmerValidator();
