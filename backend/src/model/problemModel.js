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
  votes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    enum: ["easy", "hard"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
