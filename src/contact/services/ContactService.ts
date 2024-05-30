import { Contact } from "./types";
import ContactModel from "../model/Contact";
import { Op } from "sequelize";

const createContactService = async (args: Contact) => {
  try {
    // check email exist or not
    const emailExistency: any = await ContactModel.findOne({
      where: {
        [Op.or]: [{ email: args.email }, { phoneNumber: args.phoneNumber }],
      },
    });

    const saveData = await ContactModel.create({
      phoneNumber: args.phoneNumber,
      email: args.email,
      linkedId: 11,
      linkPrecedence: emailExistency ? "secondary" : "primary",
    });
    return {
      message: "created successfully",
      isError: false,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "something went wrong",
      isError: true,
    };
  }
};

export { createContactService };
