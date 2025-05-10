import Problem from "../model/problemModel.js";
import User from "../model/users.js";
export const createProblem = async (req, res) => {
  const { title, difficulty } = req.body;

  if (!title || req.files.length < 1) {
    return res
      .status(400)
      .json({ message: "Title and at least one image are required." });
  }

  const imagePaths = req.files.map((file) => file.path);

  const problem = await Problem.create({
    user: req.user._id,
    title,
    images: imagePaths,
    difficulty,
    coordinates,
  });

  res.status(201).json(problem);
};

export const getProblems = async (req, res) => {
  const problems = await Problem.find({}).sort({ createdAt: -1 });
  res.status(200).json(problems);
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;

  const problem = await Problem.findById(id);

  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }

  res.status(200).json(problem);
};

export const voteProblem = async (req, res) => {
  const { id } = req.params;

  const problem = await Problem.findById(id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }

  if (!problem.votes) {
    problem.votes = [];
  }

  if (problem.votes.includes(req.user._id)) {
    return res.status(400).json({ message: "You have already voted." });
  }

  problem.votes.push(req.user._id);
  problem.voteCount += 1;
  await problem.save();
  res.status(200).json({ message: "Vote added successfully." });
};

export const getUserProblems = async (req, res) => {
  const userId = req.user._id;

  const problems = await Problem.find({ user: userId }).sort({ createdAt: -1 });

  if (!problems || problems.length === 0) {
    return res
      .status(404)
      .json({ message: "No problems found for this user." });
  }

  res.status(200).json(problems);
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  const problem = await Problem.findById(id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }

  if (problem.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this problem." });
  }

  await problem.deleteOne();
  res.status(200).json({ message: "Problem deleted successfully." });
};

export const getVoteCount = async (req, res) => {
  const { id } = req.params;

  const problem = await Problem.findById(id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }
  res.status(200).json({ voteCount: problem.voteCount });
};

export const takeEasyProblem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const problem = await Problem.findById(id);
    const worker = await User.findById(userId);

    if (!problem || !worker) {
      return res.status(404).json({ message: "Problem or user not found" });
    }

    if (problem.difficulty !== "easy") {
      return res
        .status(400)
        .json({ message: "Only easy problems can be accepted" });
    }

    if (problem.takenBy) {
      return res.status(400).json({ message: "Problem already taken" });
    }

    problem.takenBy = userId;
    await problem.save();

    const reward = 3000;
    worker.balance += reward;
    worker.takenProblems.push(problem._id);

    await worker.save();

    return res.status(200).json({ message: "Problem accepted", reward });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
