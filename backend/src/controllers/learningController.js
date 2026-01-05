// controllers/learningController.js
import { LearningItem } from "../models/LearningItem.js";
import { User } from "../models/user.js";

export const getLearningItems = async (req, res) => {
    try {
        const items = await LearningItem.find();

        const completedIds = req.user.completedLearningItems.map(id =>
            id.toString()
        );

        const enrichedItems = items.map(item => ({
            ...item.toObject(),
            completed: completedIds.includes(item._id.toString()),
        }));

        res.json(enrichedItems);
    } catch (err) {
        res.status(500).json({ message: "Failed to load learning items" });
    }
};

export const toggleLearningItemStatus = async (req, res) => {
    const { itemId } = req.body;

    const user = req.user;

    const index = user.completedLearningItems.findIndex(
        id => id.toString() === itemId
    );

    if (index === -1) {
        user.completedLearningItems.push(itemId);
    } else {
        user.completedLearningItems.splice(index, 1);
    }

    await user.save();
    res.json({ success: true });
};

