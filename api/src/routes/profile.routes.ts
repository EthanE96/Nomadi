import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { ProfileController } from "../controllers/profile.controller";
import { ProfileService } from "../services/profile.service";

const router = Router();
const profileController = new ProfileController(new ProfileService());

router.get("/", isAuthenticated, profileController.profileGetById);
router.patch("/", isAuthenticated, profileController.profileUpdateById);

export default router;
