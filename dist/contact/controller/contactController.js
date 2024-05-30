"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllContacts = exports.createContact = exports.initialRoute = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const ContactService_1 = require("../services/ContactService");
const initialRoute = (req, res) => {
    return apiResponse_1.default.result(res, "BITE SPEED DESIGN API", [], http_status_codes_1.default.OK);
};
exports.initialRoute = initialRoute;
const createContact = async (req, res) => {
    try {
        const { email, phoneNumber } = req.query;
        const savingContact = await (0, ContactService_1.createContactService)({
            email: String(email),
            phoneNumber: String(phoneNumber),
        });
        return apiResponse_1.default.result(res, savingContact.message, savingContact.data, http_status_codes_1.default.CREATED);
    }
    catch (error) {
        return apiResponse_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, error.message);
    }
};
exports.createContact = createContact;
const listAllContacts = async (req, res) => {
    try {
        const payload = req.body;
        const getData = await (0, ContactService_1.contactListService)({
            email: payload.email,
            phoneNumber: payload.phoneNumber,
        });
        return apiResponse_1.default.result(res, getData.message, getData.data, http_status_codes_1.default.OK);
    }
    catch (error) {
        return apiResponse_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, error.message);
    }
};
exports.listAllContacts = listAllContacts;
//# sourceMappingURL=contactController.js.map