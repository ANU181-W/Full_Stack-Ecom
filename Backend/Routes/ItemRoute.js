import express from "express";
import {
  createItem,
  getItems,
  getItemsByCategory,
  getItemsbyid,
} from "../controller/CreateItem.js";
const itemRouter = express.Router();
itemRouter.post("/CreateItem", createItem);
itemRouter.get("/GetItems", getItems);
itemRouter.get("/GetItems/:category", getItemsByCategory);
itemRouter.get("/:id", getItemsbyid);
export default itemRouter;
