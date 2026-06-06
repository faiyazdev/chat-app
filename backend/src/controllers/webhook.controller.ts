import { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { deleteUserByClerkId, upsertUser } from "../services/user.service.js";

export const clerkWebhook = async (req: Request, res: Response) => {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    switch (eventType) {
      case "user.created":
      case "user.updated":
        // Handle user creation or update
        const name = evt.data.first_name + " " + evt.data.last_name; // This contains the user object
        const email = evt.data.email_addresses[0].email_address;
        const profilePicture = evt.data.image_url;
        const clerkUserId = evt.data.id;

        const newUser = await upsertUser({
          name,
          email,
          profilePicture,
          clerkUserId,
        });

        console.log(`User created/updated: ${newUser}`);
        break;

      case "user.deleted":
        // Handle user deletion
        await deleteUserByClerkId(evt.data.id!); // Implement this function to delete user from your database
        console.log(`User deleted: ${evt.data.id}`);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return res.send("Webhook received");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error verifying webhook");
  }
};
