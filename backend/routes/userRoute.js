import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/getUserController.js";
import User from "../models/User.js";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

const router = express.Router();

router.get("/me", auth, getCurrentUser);

// ✅ Public user list with income/expense totals
router.get("/public-users", async (req, res) => {
  try {
    const users = await User.find({}, "username profileImage");

    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const incomeTotalData = await Income.aggregate([
          { $match: { user: user._id } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const expenseTotalData = await Expense.aggregate([
          { $match: { user: user._id } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        return {
          _id: user._id,
          username: user.username,
          profileImage: user.profileImage || null,
          incomeTotal: incomeTotalData[0]?.total || 0,
          expenseTotal: expenseTotalData[0]?.total || 0,
        };
      })
    );

    res.json(enrichedUsers);
  } catch (err) {
    console.error("Public user fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
