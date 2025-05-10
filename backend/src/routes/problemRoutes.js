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
  takeEasyProblem,
} from "../controllers/problemController.js";
import protect from "../middlewares/authenticate.js";

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

router.post("/create", protect, upload.array("images", 3), createProblem);
router.get("/get", protect, getProblems);
router.get("/get/:id", protect, getProblemById);
router.post("/vote/:id", protect, voteProblem);
router.get("/user", protect, getUserProblems);
router.delete("/delete/:id", protect, deleteProblem);
router.get("/voteCount/:id", protect, getVoteCount);
router.post("/take/:id", protect, takeEasyProblem);
export default router;
