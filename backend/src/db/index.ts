import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";
import { env } from "../config/env.js";

const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql, schema });
export default db;
