import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";
import moment from "moment";

class Contact extends Model {
  public id!: number;
  public phoneNumber!: string;
  public email!: string;
  public linkedId!: number;
  public linkPrecedence!: string;
  public deletedAt!: Date | null;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    linkPrecedence: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    createdAt: {
      type: DataTypes.TIME,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.TIME,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      allowNull: true,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    sequelize,
    modelName: "Contact",
    tableName: "contacts",
  }
);

export default Contact;
