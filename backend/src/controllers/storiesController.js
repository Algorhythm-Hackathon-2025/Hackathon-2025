import validateAll from "../middlewares/validateAll.js";
import { body } from "express-validator";
import asyncHandler from "#src/middlewares/asyncHandler.js";
import Stories from "#src/model/stories.js";
import assignNonnull from "#src/utils/assignNonnull.js";

// Create or update a story
export const createStoryValidation = validateAll([
  body("title").isString().notEmpty().escape(),
  body("description").isString().notEmpty().escape(),
]);

function mongoArrayToDict(array) {
  return Object.fromEntries(array.map(({ key, value }) => [key, value]));
}
function mongoDictToArray(dict) {
  return Object.entries(dict).map(([key, value]) => ({ key, value }));
}

export const createStory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { title, description } = req.body;
  console.log(title, description);

  // Check if a story with the same title exists
  const story = await Stories.findOne({ title, author: user._id });

  if (story) {
    // Update existing story
    await Object.assign(story, {
      title,
      description,
    }).save();
    res.json(story._id);
  } else {
    // Create new story
    const newStory = new Stories({
      title,
      description,
      author: user._id,
    });
    const story = await newStory.save();
    res.json(story._id);
  }
});

export const getUserStories = asyncHandler(async (req, res) => {
  // Parse pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Parse sorting parameters
  let sortBy = req.query.sortBy || "createdAt";
  let order = req.query.order === "asc" ? 1 : -1;
  const sortOptions = {};

  // Handle special sorting cases
  if (sortBy === "mostRead") {
    sortBy = "readCount";
    order = -1; // Default to descending for most read
  } else if (sortBy === "mostLiked") {
    sortBy = "likes";
    order = -1; // Default to descending for most liked
  }

  sortOptions[sortBy] = order;

  // Count total documents for pagination metadata
  const total = await Stories.countDocuments({ author: req.user._id });

  // Find stories with pagination and sorting
  const stories = await Stories.find({ author: req.user._id })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  // Calculate pagination metadata
  const totalPages = Math.ceil(total / limit);

  res.json({
    stories,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

// Track story reads
export const incrementReadCount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const story = await Stories.findById(id);
  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  // Increment the read count
  story.readCount = (story.readCount || 0) + 1;
  await story.save();

  res.json({ readCount: story.readCount });
});

// Toggle like on a story
export const toggleLike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const story = await Stories.findById(id);
  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  // Check if user already liked the story
  const alreadyLiked = story.likedBy.includes(userId);

  if (alreadyLiked) {
    // Unlike: Remove user from likedBy and decrement likes count
    story.likedBy = story.likedBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    story.likes = Math.max(0, (story.likes || 1) - 1);
  } else {
    // Like: Add user to likedBy and increment likes count
    story.likedBy.push(userId);
    story.likes = (story.likes || 0) + 1;
  }

  await story.save();

  res.json({
    likes: story.likes,
    liked: !alreadyLiked,
  });
});
export const updateStoryValidation = validateAll([
  body("title").optional().isString().notEmpty().escape(),
  body("description").optional().isString().notEmpty().escape(),
  body("content").optional().isString().notEmpty().escape(),
  body("vocabulary").optional().isObject(),
  body("vocabulary.*").optional().isString().notEmpty().escape(),
  body("unique").optional().isObject(),
  body("unique.*").optional().isString().notEmpty().escape(),
]);
export const updateStory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, content, vocabulary, unique } = req.body;
  const story = await Stories.findById(id);
  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }
  assignNonnull(story, {
    title,
    description,
    content,
    vocabulary: mongoDictToArray(vocabulary),
    unique: mongoDictToArray(unique),
  });
  await story.save();
  res.json("OK");
});
export const getStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const story = await Stories.findById(id).lean();
  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }
  res.json({
    ...story,
    vocabulary: mongoArrayToDict(story.vocabulary),
    unique: mongoArrayToDict(story.unique),
  });
});

export const getAuthorStories = asyncHandler(async (req, res) => {
  // Find all stories belonging to the current user
  const stories = await Stories.find({ author: req.user._id }).select(
    "title author description"
  );

  res.json(stories);
});
