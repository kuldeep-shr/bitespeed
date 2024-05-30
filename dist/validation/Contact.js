"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactListSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const contactListSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .allow(null, "")
        .error(new Error("please enter a valid email")),
    phoneNumber: joi_1.default.string()
        .allow(null, "")
        .error(new Error("please enter a valid phone number")),
})
    .or("email", "phoneNumber")
    .error(new Error("please provide either a valid email or phone number"));
const contactListSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error } = contactListSchema.validate(data);
    if (error) {
        apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.message);
        return null;
    }
    next();
};
exports.contactListSchemaValidation = contactListSchemaValidation;
//# sourceMappingURL=Contact.js.map