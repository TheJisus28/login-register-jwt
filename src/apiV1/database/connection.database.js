import pkg from "pg";
const { Pool } = pkg;
import { DATABASE_URL } from "../../../config.js";

export const db = new Pool({
  allowExitOnIdle: true,
  connectionString: DATABASE_URL,
});

try {
  await db.query("SELECT NOW()");
  console.log("DATABASE CONNECTED SUCCESFULLY");
} catch (error) {
  console.log("DATABASE CONNECTION FAILED");
}
