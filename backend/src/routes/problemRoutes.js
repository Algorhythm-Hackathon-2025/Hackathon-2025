import express from "express";
import multer from "multer";
import {
  createProblem,
  getProblems,
  getProblemById,
  voteProblem,
  getUserProblems,
  deleteProblem,
  getVoteCount,
  updateProblemStatus,
  takeEasyProblem,
} from "../controllers/problemController.js";
import protect from "../middlewares/authenticate.js";
import { admin } from "../middlewares/authenticate.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/create", protect, upload.array("images", 5), createProblem);
router.get("/get", protect, getProblems);
router.get("/get/:id", protect, getProblemById);
router.post("/vote/:id/:vote", protect, voteProblem);
router.post("/vote/:id", protect, voteProblem);
router.get("/user", protect, getUserProblems);
router.delete("/delete/:id", protect, deleteProblem);
router.get("/voteCount/:id", protect, getVoteCount);
router.post("/take/:id", protect, takeEasyProblem);
router.put("/:id/status", protect, admin, updateProblemStatus);
export default router;
