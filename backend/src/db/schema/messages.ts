import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, 
     id, updatedAt } from "../schemaHelper.js";
import { usersTable } from "./users.js";

export const messagesTable = pgTable("messages", {
  id,
  senderId : uuid("sender_id").notNull().references(()=>usersTable.id),
  receiverId : uuid("receiver_id").notNull().references(()=>usersTable.id),
  text: varchar("text", { length: 1000 }).notNull(),
  image: varchar("image", { length: 255 }),
  createdAt,
  updatedAt,
});

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  sender: one(usersTable, {
    fields: [messagesTable.senderId],
    references: [usersTable.id],
    relationName: "sentMessages",
  }),
  receiver: one(usersTable, {
    fields: [messagesTable.receiverId],
    references: [usersTable.id],
    relationName: "receivedMessages",
  }),
}));

export type MessageInsert = typeof messagesTable.$inferInsert;
export type MessageSelect = typeof messagesTable.$inferSelect;

