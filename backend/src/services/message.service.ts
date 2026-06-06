import { and, eq, or, asc } from "drizzle-orm";
import db from "../db/index.js";
import { MessageInsert, messagesTable } from "../db/schema.js";

export const getMessagesBetweenTwoUsers = async (
  currentUserId: string,
  otherUserId: string,
) => {
  return db
    .select()
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
    .orderBy(asc(messagesTable.createdAt));
};
export const createMessage = async ({
  senderId,
  receiverId,
  text,
  image,
}: MessageInsert) => {
  return db.insert(messagesTable).values({
    senderId,
    receiverId,
    text,
    image,
  });
};
