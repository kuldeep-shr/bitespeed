import { Sequelize } from "sequelize";
import UserModel from "../contact/model/Contact";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: String(process.env.DB_NAME),
});

// Function to insert sample data into the SQLite database
async function insertSampleData() {
  try {
    await UserModel.sync({ force: true });

    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await sequelize.close();
  }
}
insertSampleData();
