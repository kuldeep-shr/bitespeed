import Joi from "joi";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import apiResponse from "../utils/apiResponse";

const contactListSchema = Joi.object({
  email: Joi.string()
    .email()
    .allow(null, "")
    .error(new Error("please enter a valid email")),
  phoneNumber: Joi.string()
    .allow(null, "")
    .error(new Error("please enter a valid phone number")),
})
  .or("email", "phoneNumber")
  .error(new Error("please provide either a valid email or phone number"));

const contactListSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = contactListSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};

export { contactListSchemaValidation };
