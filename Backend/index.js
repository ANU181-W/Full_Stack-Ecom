import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import itemRouter from "./Routes/ItemRoute.js";
import userrouter from "./Routes/UserRoute.js";
import reviewrouter from "./Routes/Review.js";
import clerkWebhook from "./Routes/ClerkWebhook.js"
dotenv.config();
app.use("/webhooks",clerkWebhook)
const port = process.env.port_no;
app.use(express.json());
const corsOptions = {
  origin: process.env.frontend_url,
  Credentials: true,
};
app.use(cors());
app.use("/item", itemRouter);
app.use("/user", userrouter);
app.use("/review", reviewrouter);

import { DB_CONNECT } from "./Config/Database.js";
DB_CONNECT();
app.listen(port, () => {
  console.log(`Server Started Successfully at ${port}`);
});
