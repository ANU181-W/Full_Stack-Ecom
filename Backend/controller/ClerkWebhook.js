// controller/ClerkWebhook.js

import dotenv from "dotenv";
dotenv.config();

import { Webhook } from "svix";
import User from "../models/User.js";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const handleClerkWebhook = async (req, res) => {
  console.log("🔥 Webhook triggered");
  console.log("Headers:", req.headers);

  // IMPORTANT: req.body MUST be raw buffer for Clerk
  const rawBody = req.body;
  console.log("Raw body (Buffer):", rawBody);

  if (!CLERK_WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    return res.status(500).send("Server misconfiguration");
  }

  let event;

  try {
    // ✅ Correct Clerk verification (works only if raw body is used)
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    if (process.env.NODE_ENV === "production") {
      event = wh.verify(rawBody, req.headers);
    } else {
      // Non-production: skip verification & parse JSON
      console.log("⚠️ Development mode: skipping signature verification");
      event = JSON.parse(rawBody.toString());
    }

    console.log("✅ Event Verified:", event);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return res.status(400).send("Invalid signature");
  }

  const data = event.data;
  const eventType = event.type;

  console.log("✅ Event Type:", eventType);
  console.log("✅ Event Data:", JSON.stringify(data, null, 2));

  try {
    switch (eventType) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address;

        console.log("Creating user with email:", email);

        await User.create({
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email,
          password: "clerk_auth",
          role: "user",
        });

        console.log("✅ MongoDB: user created:", email);
        break;
      }

      case "user.updated": {
        const email = data.email_addresses?.[0]?.email_address;

        console.log("Updating user:", email);

        await User.findOneAndUpdate(
          { email },
          { name: `${data.first_name || ""} ${data.last_name || ""}`.trim() }
        );

        console.log("🔁 MongoDB: user updated:", email);
        break;
      }

      case "user.deleted": {
        const email = data.email_addresses?.[0]?.email_address;

        console.log("Deleting user:", email);

        await User.findOneAndDelete({ email });

        console.log("🗑️ MongoDB: user deleted:", email);
        break;
      }

      default:
        console.log("ℹ️ Unhandled Clerk event type:", eventType);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("⚠️ MongoDB Error:", err);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};
