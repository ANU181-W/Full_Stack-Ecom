import express from "express";
import { handleClerkWebhook } from "../controller/ClerkWebhook.js";

const router = express.Router();

router.post("/clerk", express.raw({ type: "application/json" }), handleClerkWebhook);

export default router;
