import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
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
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          vote: { type: String, enum: ["up", "down"], required: true },
        },
      ],
      default: [],
    },
    voteSum: { type: Number, default: 0 },
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
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "done"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
