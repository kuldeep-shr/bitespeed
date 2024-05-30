"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//controllers
const contactController_1 = require("../contact/controller/contactController");
const Contact_1 = require("../validation/Contact");
router.get("/", contactController_1.initialRoute);
router.get("/create", contactController_1.createContact);
router.post("/identify", Contact_1.contactListSchemaValidation, contactController_1.listAllContacts);
exports.allRoutes = router;
//# sourceMappingURL=routes.js.map