// routes/auth.js
import express from "express";
import multer from "multer";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);

export default router;
