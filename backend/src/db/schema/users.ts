import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelper.js";

export const usersTable = pgTable("users", {
  id,
  clerkUserId: text("clerk_user_id").notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  profilePicture: varchar("profile_picture", { length: 255 }),
  createdAt,
  updatedAt,
  deletedAt,
});

export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;
