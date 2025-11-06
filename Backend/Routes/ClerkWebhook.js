import express from "express";
import { handleClerkWebhook } from "../controller/ClerkWebhook.js";

const router = express.Router();

router.post("/clerk", express.json({ type: "*/*" }), handleClerkWebhook);

export default router;
