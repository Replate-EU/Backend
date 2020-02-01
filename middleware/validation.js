const joi = require("@hapi/joi");

const createValidationMiddleware = schema =>
  //takes in a schema and returns a middleware function checking for schema
  async function(req, res, next) {
    const body = req.body;
    if (body) {
      try {
        await schema.validateAsync(body);
        next();
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({ message: "Missing request body" });
    }
  };

const loginSchema = joi.object({
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(128)
    .required(),
  password: joi
    .string()
    .min(5)
    .required()
});

const registerSchema = joi.object({
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(128)
    .required(),
  password: joi
    .string()
    .min(5)
    .max(128)
    .required(),
  user_type: joi
    .string()
    .pattern(/^(volunteer|business)$/)
    .required(),
  contact_number: joi.string().required()
});

const pickupSchema = joi.object({
  food_type: joi.string().required(),
  pickup_time: joi
    .number()
    .integer()
    .required(),
  quantity: joi.number().required(),
  completed: joi.boolean(),
  business_id: joi
    .number()
    .integer()
    .required(),
  claimed_by: joi.number().integer()
});

const businessDetailsSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  user_id: joi
    .number()
    .integer()
    .required()
});

const volunteerDetailsSchema = joi.object({
  name: joi.string().required(),
  user_id: joi
    .number()
    .integer()
    .required()
});

module.exports = {
  validateLogin: createValidationMiddleware(loginSchema),
  validateRegister: createValidationMiddleware(registerSchema),
  validatePickup: createValidationMiddleware(pickupSchema),
  validateBusinessDetails: createValidationMiddleware(businessDetailsSchema),
  validateVolunteerDetails: createValidationMiddleware(volunteerDetailsSchema)
};
