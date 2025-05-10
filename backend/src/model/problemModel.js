import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  categories: {
    type: String,
    enum: ["streetlight", "sidewalk", "trash", "pothole", "others"],
    required: true,
  },
  votes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "hard"],
    required: true,
  },
  takenBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Problem",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
