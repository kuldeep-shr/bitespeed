import express from "express";
const router = express.Router();

//controllers
import {
  initialRoute,
  createContact,
  listAllContacts,
} from "../contact/controller/contactController";

import { contactListSchemaValidation } from "../validation/Contact";

router.get("/", initialRoute);

router.get("/create", createContact);
router.post("/identify", contactListSchemaValidation, listAllContacts);

export const allRoutes = router;
