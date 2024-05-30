"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactListService = exports.createContactService = void 0;
const Contact_1 = __importDefault(require("../model/Contact"));
const sequelize_1 = require("sequelize");
const createContactService = async (args) => {
    try {
        // check email exist or not
        const emailExistency = await Contact_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ email: args.email }, { phoneNumber: args.phoneNumber }],
            },
        });
        let extractPrimaryOne = emailExistency.map((d) => d.dataValues);
        extractPrimaryOne = extractPrimaryOne.filter((data) => data.linkPrecedence == "primary");
        const saveData = await Contact_1.default.create({
            phoneNumber: args.phoneNumber,
            email: args.email,
            linkedId: extractPrimaryOne.length !== 0 ? extractPrimaryOne[0].id : null,
            linkPrecedence: extractPrimaryOne.length != 0 ? "secondary" : "primary",
        });
        const returnData = {
            message: "created successfully",
            isError: false,
            statusCode: 200,
            data: [],
        };
        return returnData;
    }
    catch (error) {
        const returnData = {
            message: "something went wrong while creating the contact",
            isError: true,
            statusCode: 400,
            data: [],
        };
        return returnData;
    }
};
exports.createContactService = createContactService;
const contactListService = async (args) => {
    try {
        const getAllContacts = await Contact_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ email: args.email }, { phoneNumber: args.phoneNumber }],
            },
        });
        const extractContactList = getAllContacts.map((d) => d.dataValues);
        console.log("extractPrimaryOne====>>>>", extractContactList);
        // Function to transform the data
        function transformContactsToResponse(contacts) {
            const primaryContact = contacts.find((contact) => contact.linkPrecedence === "primary");
            if (!primaryContact) {
                throw new Error("No primary contact found");
            }
            const primaryContactId = primaryContact.id;
            const primaryContactNumber = parseInt(primaryContact.phoneNumber);
            const emails = new Set();
            const secondaryContactIds = new Set();
            contacts.forEach((contact) => {
                if (contact.deletedAt !== null) {
                    emails.add(contact.email);
                }
                if (contact.linkPrecedence === "secondary") {
                    secondaryContactIds.add(contact.id);
                }
            });
            return {
                contact: {
                    primaryContactId: primaryContactId,
                    emails: Array.from(emails),
                    phoneNumbers: [primaryContactNumber],
                    secondaryContactIds: Array.from(secondaryContactIds),
                },
            };
        }
        // Transform the contacts array
        const response = transformContactsToResponse(extractContactList);
        const returnData = {
            message: "contact list",
            isError: false,
            statusCode: 200,
            data: response,
        };
        return returnData;
    }
    catch (error) {
        return {
            isError: true,
            message: "Something went wrong while in contactListService",
            statusCode: 400,
            data: [],
        };
    }
};
exports.contactListService = contactListService;
//# sourceMappingURL=ContactService.js.map