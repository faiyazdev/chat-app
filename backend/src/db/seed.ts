import db from "./index.js";
import { usersTable, UserInsert } from "./schema.js";

async function main() {
  const user: UserInsert = {
    name: "John",
    email: "john@example.com",
    clerkUserId: "clerk_user_123",
  };
  await db.insert(usersTable).values(user);
  console.log("New user created!");
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
}
main();
