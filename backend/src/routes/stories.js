import express from "express";

import {
  incrementReadCount,
  toggleLike,
  createStory,
  createStoryValidation,
  getStoryById,
  getAuthorStories,
  updateStoryValidation,
  updateStory,
} from "../controllers/storiesController.js";

const router = express.Router();

// Create a new story
router.post("/", createStoryValidation, createStory);
router.put("/:id", updateStoryValidation, updateStory);

// Get user's stories
router.get("/author/me", getAuthorStories);
router.get("/:id", getStoryById);

// Track story reads
router.post("/:id/read", incrementReadCount);

// Like/unlike a story
router.post("/:id/like", toggleLike);

export default router;
