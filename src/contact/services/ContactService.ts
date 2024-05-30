import { Contact, ApiPayload, ServiceResponse } from "./types";
import ContactModel from "../model/Contact";
import { Op } from "sequelize";

const createContactService = async (args: ApiPayload) => {
  try {
    // check email exist or not
    const emailExistency: any = await ContactModel.findAll({
      where: {
        [Op.or]: [{ email: args.email }, { phoneNumber: args.phoneNumber }],
      },
    });
    let extractPrimaryOne = emailExistency.map((d: any) => d.dataValues);
    extractPrimaryOne = extractPrimaryOne.filter(
      (data: any) => data.linkPrecedence == "primary"
    );

    const saveData = await ContactModel.create({
      phoneNumber: args.phoneNumber,
      email: args.email,
      linkedId: extractPrimaryOne.length !== 0 ? extractPrimaryOne[0].id : null,
      linkPrecedence: extractPrimaryOne.length != 0 ? "secondary" : "primary",
    });
    const returnData: ServiceResponse = {
      message: "created successfully",
      isError: false,
      statusCode: 200,
      data: [],
    };
    return returnData;
  } catch (error) {
    const returnData: ServiceResponse = {
      message: "something went wrong while creating the contact",
      isError: true,
      statusCode: 400,
      data: [],
    };
    return returnData;
  }
};

const contactListService = async (
  args: ApiPayload
): Promise<ServiceResponse> => {
  try {
    const getAllContacts: any = await ContactModel.findAll({
      where: {
        [Op.or]: [{ email: args.email }, { phoneNumber: args.phoneNumber }],
      },
    });

    const extractContactList: Contact[] = getAllContacts.map(
      (d: any) => d.dataValues
    );
    console.log("extractPrimaryOne====>>>>", extractContactList);

    // Function to transform the data
    function transformContactsToResponse(contacts: Contact[]): ServiceResponse {
      const primaryContact = contacts.find(
        (contact) => contact.linkPrecedence === "primary"
      );

      if (!primaryContact) {
        throw new Error("No primary contact found");
      }

      const primaryContactId: any = primaryContact.id;
      const primaryContactNumber: any = parseInt(primaryContact.phoneNumber);
      const emails = new Set<string>();
      const secondaryContactIds = new Set<number>();

      contacts.forEach((contact: any) => {
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
    const response: ServiceResponse =
      transformContactsToResponse(extractContactList);
    const returnData: ServiceResponse = {
      message: "contact list",
      isError: false,
      statusCode: 200,
      data: response,
    };
    return returnData;
  } catch (error) {
    return {
      isError: true,
      message: "Something went wrong while in contactListService",
      statusCode: 400,
      data: [],
    } as ServiceResponse;
  }
};

export { createContactService, contactListService };
