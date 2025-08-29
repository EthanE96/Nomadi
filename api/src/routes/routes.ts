import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import authRoutes from "./auth.routes";
import profileRoutes from "./profile.routes";
import userRoutes from "./user.routes";
import tripRoutes from "./trips.routes";
import { NotFoundError } from "../models/errors.model";

const router = Router();

//^ Public Routes
// /api/health
router.get("/health", (_req, res) => {
  res.json({
    status: "Healthy",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

//^ Private Routes
// /api/auth (uses some public routes)
router.use("/auth", authRoutes);

// /api/profile
router.use("/profile", isAuthenticated, profileRoutes);

// /api/user
router.use("/user", isAuthenticated, userRoutes);

// /api/trips
router.use("/trips", isAuthenticated, tripRoutes);

//^ Error handling
// Wildcard catch-all: forward unknown to main 404 handler as NotFoundError
router.get("/*", (_req, _res, next) => {
  next(new NotFoundError("The API endpoint you requested does not exist."));
});

export default router;
