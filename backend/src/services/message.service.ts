import { and, eq, or, asc, getTableColumns } from "drizzle-orm";
import db from "../db/index.js";
import { MessageInsert, messagesTable, usersTable } from "../db/schema.js";

export const getMessagesBetweenTwoUsers = async (
  currentUserId: string,
  otherUserId: string,
) => {
  // Destructure to exclude specific fields
  const messagesFields = getTableColumns(messagesTable);
  return db
    .select({
      ...messagesFields,
      senderClerkId: usersTable.clerkUserId,
      senderName: usersTable.name,
    })
    .from(messagesTable)
    .where(
      or(
        and(
          eq(messagesTable.senderId, currentUserId),
          eq(messagesTable.receiverId, otherUserId),
        ),
        and(
          eq(messagesTable.senderId, otherUserId),
          eq(messagesTable.receiverId, currentUserId),
        ),
      ),
    )
    .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id))
    .orderBy(asc(messagesTable.createdAt));
};
export const createMessage = async ({
  senderId,
  receiverId,
  text,
  image,
}: MessageInsert) => {
  // Insert the new message and return the created message with all fields as well as user info

  const [newMessage] = await db
    .insert(messagesTable)
    .values({
      senderId,
      receiverId,
      text,
      image,
    })
    .returning();

  const message = await db
    .select({
      ...getTableColumns(messagesTable),
      senderClerkId: usersTable.clerkUserId,
      senderName: usersTable.name,
    })
    .from(messagesTable)
    .where(eq(messagesTable.id, newMessage.id))
    .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id));

  return message[0];
};
