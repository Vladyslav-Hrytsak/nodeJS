import Joi from "joi";

export const validationSchema = Joi.object({
  name: Joi.string().min(4).required().messages({
    "string.min": "name is too short",
    "any.required": "name is not empty",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(3)
    .max(10)
    .pattern(/^[a-zA-Z0-9]{3,10}$/)
    .required()
    .messages({
      "string.min": "The password must be at least 3 characters long.",
      "string.pattern.base":
        "The password can only contain Latin letters and numbers.",
    }),

  age: Joi.number().integer().min(1).max(100).required().messages({
    "number.min": "Age must be greater than 0",
    "number.max": "Age cannot exceed 100",
  }),
});


