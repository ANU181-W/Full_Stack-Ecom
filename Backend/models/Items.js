import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true,
  },
  images_url: [{ type: String, required: true }],
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  itemtype: {
    type: String,
  
  },
});

export default mongoose.model("Items", itemSchema);
