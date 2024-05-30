import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse";
import { createContactService } from "../services/ContactService";
import { ParsedQs } from "qs";
import { Payload } from "./types";

export const createUser = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.query as ParsedQs;
  try {
    await createContactService({
      email: String(email),
      phoneNumber: String(phoneNumber),
    }).then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.message,
          [],
          httpStatusCodes.CREATED
        );
      } else {
        return apiResponse.result(
          res,
          data.message,
          data,
          httpStatusCodes.BAD_REQUEST
        );
      }
    });
  } catch (error: any) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
  }
};

export const initialRoute = (req: Request, res: Response) => {
  return apiResponse.result(
    res,
    "BITE SPEED DESIGN API",
    [],
    httpStatusCodes.OK
  );
};
