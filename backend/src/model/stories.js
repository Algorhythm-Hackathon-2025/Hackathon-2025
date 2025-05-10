import { model, Schema } from "mongoose";

const storySchema = Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    vocabulary: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    unique: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    readCount: { type: Number, default: 0 }, // Track number of reads
    likes: { type: Number, default: 0 }, // Track number of likes
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Track which users liked this story
  },
  { timestamps: true }
);
const Stories = model("Stories", storySchema);

export default Stories;
