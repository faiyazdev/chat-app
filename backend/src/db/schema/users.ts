import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelper.js";
import { messagesTable } from "./messages.js";

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

export const usersRelations = relations(usersTable, ({ many }) => ({
  sentMessages: many(messagesTable, { relationName: "sentMessages" }),
  receivedMessages: many(messagesTable, { relationName: "receivedMessages" }),
}));

export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;

