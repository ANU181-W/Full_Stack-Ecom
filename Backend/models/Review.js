import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },

  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  posted_on: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
