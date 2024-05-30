import express from "express";
const router = express.Router();

//authentication
// import { verifyToken } from "../middleware/commonMiddlewares";

//validations
import {
  registerSchemaValidation,
  loginSchemaValidation,
} from "../validation/User";

//controllers
import {
  createUser,
  initialRoute,
} from "../contact/controller/contactController";

router.get("/", initialRoute);

router.get("/create", createUser);

export const allRoutes = router;
