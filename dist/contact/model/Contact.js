"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const moment_1 = __importDefault(require("moment"));
class Contact extends sequelize_1.Model {
}
Contact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    linkedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    linkPrecedence: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: "",
    },
    createdAt: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
        allowNull: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
        allowNull: true,
    },
}, {
    createdAt: true,
    updatedAt: true,
    sequelize: connection_1.default,
    modelName: "Contact",
    tableName: "contacts",
});
exports.default = Contact;
//# sourceMappingURL=Contact.js.map