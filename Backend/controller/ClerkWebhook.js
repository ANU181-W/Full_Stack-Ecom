// controller/ClerkWebhook.js
import dotenv from "dotenv";
dotenv.config();

import { Webhook } from "svix";
import User from "../models/User.js";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const handleClerkWebhook = async (req, res) => {
  console.log("🔥 Webhook triggered");

  const rawBody = req.body; // Buffer
  const headers = req.headers;

  if (!CLERK_WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    return res.status(500).send("Server misconfiguration");
  }

  let event;

  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    // ✅ Production: always verify signature with raw body
    event = wh.verify(rawBody, headers);

    console.log("✅ Event verified:", event);
  } catch (err) {
    console.error("❌ Signature verification failed:", err.message);
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

        await User.create({
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email,
          password: "clerk_auth",
          role: "user",
        });

        console.log("✅ User created:", email);
        break;
      }

      case "user.updated": {
        const email = data.email_addresses?.[0]?.email_address;

        await User.findOneAndUpdate(
          { email },
          { name: `${data.first_name || ""} ${data.last_name || ""}`.trim() }
        );

        console.log("🔁 User updated:", email);
        break;
      }

      case "user.deleted": {
        const email = data.email_addresses?.[0]?.email_address;

        await User.findOneAndDelete({ email });

        console.log("🗑️ User deleted:", email);
        break;
      }

      default:
        console.log("ℹ️ Ignored event:", eventType);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("⚠️ MongoDB Error:", err);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};
