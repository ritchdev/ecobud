import { User } from "../models/user.js";
import ApiError from "../utils/ApiError.js";

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("completedLearningItems");

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            loginStreak: user.loginStreak,
            completedLearningItems: user.completedLearningItems,
            certificates: user.certificates,
            completedTraining: user.completedTraining,
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

// const toggleLearningItemStatus = async (req, res) => {
//     try {
//         const { learningItemId } = req.body;

//         if (!learningItemId)
//             return res.status(400).json({ message: "Learning item ID required" });
//         else if (!mongoose.Types.ObjectId.isValid(learningItemId))
//             return res.status(400).json({ message: "Invalid Learning item ID" });


//         const user = await User.findById(req.user._id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const alreadyCompleted = user.completedLearningItems.includes(
//             learningItemId
//         );

//         if (alreadyCompleted) {
//             // Remove (toggle OFF)
//             user.completedLearningItems.pull(learningItemId);
//         } else {
//             // Add (toggle ON)
//             user.completedLearningItems.push(learningItemId);
//         }

//         await user.save();

//         res.json({
//             message: alreadyCompleted
//                 ? "Learning item marked as incomplete"
//                 : "Learning item marked as complete",
//             completedLearningItems: user.completedLearningItems,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to toggle learning item" });
//     }
// };

const awardCertificate = async (req, res) => {
  try {
    const { certificate } = req.body;

    if (!certificate) {
      return res.status(400).json({
        message: "Certificate type required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { certificates: certificate }, // prevents duplicates
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Certificate awarded",
      certificates: updatedUser.certificates,
    });

  } catch (error) {
    console.error("Award certificate error:", error);
    return res.status(500).json({
      message: "Failed to award certificate",
    });
  }
};


export { getUserProfile, awardCertificate }