import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";

export const upsertUser = async ({
  name,
  email,
  profilePicture,
  clerkUserId,
}: {
  name: string;
  email: string;
  profilePicture: string;
  clerkUserId: string;
}) => {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkUserId, clerkUserId));
  if (existingUser.length > 0) {
    // Update existing user
    const updatedUser = await db
      .update(usersTable)
      .set({
        name,
        email,
        profilePicture,
      })
      .where(eq(usersTable.clerkUserId, clerkUserId));
    return updatedUser;
  } else {
    // Insert new user
    const newUser = await db.insert(usersTable).values({
      name,
      email,
      profilePicture,
      clerkUserId,
    });
    return newUser;
  }
};

export const deleteUserByClerkId = async (clerkUserId: string) => {
  await db.delete(usersTable).where(eq(usersTable.clerkUserId, clerkUserId));
};
