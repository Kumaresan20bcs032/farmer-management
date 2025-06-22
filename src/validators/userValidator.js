const Joi = require("joi");
const { errorResponse } = require("../utils/responseHandler");

class UserValidator {
    constructor() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

        this.schema = {
            create: Joi.object({
                username: Joi.string().required().messages({
                    'string.base': 'Username must be a string.',
                    'any.required': 'Username is required.'
                }),
                password: Joi.string().pattern(passwordPattern).required().messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one letter and one number.',
                    'any.required': 'Password is required.'
                }),
                email: Joi.string().pattern(emailPattern).required().messages({
                    'string.pattern.base': 'Invalid email format.',
                    'any.required': 'Email is required.'
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            }),
            login: Joi.object({
                password: Joi.string().pattern(passwordPattern).required().messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one letter and one number.',
                    'any.required': 'Password is required.'
                }),
                email: Joi.string().pattern(emailPattern).required().messages({
                    'string.pattern.base': 'Invalid email format.',
                    'any.required': 'Email is required.'
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            }),

            update: Joi.object({
                username: Joi.string().messages({
                    'string.base': 'Username must be a string.',
                    'any.required': 'Username is required.'
                }),
                password: Joi.string().pattern(passwordPattern).messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one letter and one number.',
                    'any.required': 'Password is required.'
                }),
                email: Joi.string().pattern(emailPattern).messages({
                    'string.pattern.base': 'Invalid email format.',
                    'any.required': 'Email is required.'
                }),
                newPassword: Joi.string().pattern(passwordPattern).messages({
                    'string.pattern.base': 'New password must be at least 8 characters long and contain at least one letter and one number.',
                    'any.required': 'New password is required.'
                })
            }).required().messages({
                'any.required': 'Empty body cannot be accepted.'
            }),
        };
    }

    validate = (schemaName) => {
        return (req, res, next) => {
            const { error } = this.schema[schemaName].validate(req.body);
            if (error) {
                console.error("User validation error:", error);
                const message = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return errorResponse(res, 400, message);
            }
            next();
        };
    };

    create = this.validate("create");
    update = this.validate("update");
    login = this.validate("login");
}

module.exports = new UserValidator();
