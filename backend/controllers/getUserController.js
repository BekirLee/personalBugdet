import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

