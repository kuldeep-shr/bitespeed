import { Contact } from "./types";
import ContactModel from "../model/Contact";
import { Op } from "sequelize";

const createContactService = async (args: Contact) => {
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
