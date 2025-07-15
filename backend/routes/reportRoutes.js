import express from "express";
import Report from "../models/reports.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Kullanıcı mesaj gönderir
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const report = new Report({ user: userId || null, message });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error("Report POST error:", error);
    res.status(500).json({ message: "Mesaj gönderilemedi." });
  }
});

// Admin tüm mesajları alır
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "username email");
    res.json(reports);
    console.log(reports.data)
  } catch (error) {
    console.error("Report GET error:", error);
    res.status(500).json({ message: "Mesajlar getirilemedi." });
  }
});

router.get("/unread-count", auth, async (req, res) => {
  try {
    const count = await Report.countDocuments({ read: false });
    res.json({ unreadCount: count });
  } catch (err) {
    console.error("Unread count error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Tüm mesajları read: true yap
router.put("/mark-all-read", auth, async (req, res) => {
  try {
    await Report.updateMany({ read: false }, { $set: { read: true } });
    res.json({ message: "Tüm mesajlar okundu olarak işaretlendi." });
  } catch (error) {
    console.error("Mark all read error:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

export default router;
