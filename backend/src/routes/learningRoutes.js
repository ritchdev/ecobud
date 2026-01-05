import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getLearningItems } from "../controllers/learningController.js";
import { toggleLearningItemStatus } from "../controllers/learningController.js";

const router = express.Router();

router.get("/", protect, getLearningItems);
router.post('/toggle', protect, toggleLearningItemStatus)

export { router as learningRouter };
