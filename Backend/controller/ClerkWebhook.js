// controller/ClerkWebhook.js
import dotenv from "dotenv";
dotenv.config();

import { Webhook } from "svix";
import User from "../models/User.js";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const handleClerkWebhook = async (req, res) => {
  const payload = req.body;
  const headers = req.headers;

  if (!CLERK_WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET in .env");
    return res.status(500).send("Server misconfiguration");
  }

  let event;

  try {
    // In production, verify the signature
    if (process.env.NODE_ENV === "production") {
      const wh = new Webhook(CLERK_WEBHOOK_SECRET);
      event = wh.verify(JSON.stringify(payload), headers);
    } else {
      // For local development, skip verification
      event = payload;
    }
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send("Invalid signature");
  }

  const data = event.data;
  const eventType = event.type;

  try {
    switch (eventType) {
      case "user.created":
        await User.create({
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses[0].email_address,
          password: "clerk_auth", // placeholder since Clerk handles auth
          role: "user",
        });
        console.log("✅ Clerk user created:", data.email_addresses[0].email_address);
        break;

      case "user.updated":
        await User.findOneAndUpdate(
          { email: data.email_addresses[0].email_address },
          { name: `${data.first_name || ""} ${data.last_name || ""}`.trim() }
        );
        console.log("🔁 Clerk user updated:", data.email_addresses[0].email_address);
        break;

      case "user.deleted":
        await User.findOneAndDelete({ email: data.email_addresses[0].email_address });
        console.log("🗑️ Clerk user deleted:", data.email_addresses[0].email_address);
        break;

      default:
        console.log("Unhandled event type:", eventType);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("⚠️ Webhook handler error:", err);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};
