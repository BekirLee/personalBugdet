import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import incomeRoutes from "./routes/income.js";
import expenseRoutes from "./routes/expense.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoute.js";
import reportRoutes from "./routes/reportRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
