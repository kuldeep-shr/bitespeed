import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse";
import {
  createContactService,
  contactListService,
} from "../services/ContactService";
import { ParsedQs } from "qs";
import { Payload } from "./types";

const initialRoute = (req: Request, res: Response) => {
  return apiResponse.result(
    res,
    "BITE SPEED DESIGN API",
    [],
    httpStatusCodes.OK
  );
};

const createContact = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.query as ParsedQs;
    const savingContact = await createContactService({
      email: String(email),
      phoneNumber: String(phoneNumber),
    });

    if (savingContact.statusCode != 400) {
      return apiResponse.result(
        res,
        savingContact.message,
        savingContact.data,
        httpStatusCodes.CREATED
      );
    } else {
      return apiResponse.result(
        res,
        savingContact.message,
        savingContact.data,
        httpStatusCodes.BAD_REQUEST
      );
    }
  } catch (error: any) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
  }
};

const listAllContacts = async (req: Request, res: Response) => {
  try {
    const payload: Payload = req.body;
    const getData: any = await contactListService({
      email: payload.email,
      phoneNumber: payload.phoneNumber,
    });
    return apiResponse.result(
      res,
      getData.message,
      getData.data,
      httpStatusCodes.OK
    );
  } catch (error: any) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
  }
};
export { initialRoute, createContact, listAllContacts };
