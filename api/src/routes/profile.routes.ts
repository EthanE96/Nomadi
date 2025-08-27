import { Router } from "express";
// import { isAuthenticated } from "../middleware/auth.middleware";
// import { ProfileController } from "../controllers/profile.controller";
// import { ProfileService } from "../services/profile.service";
import { BaseController } from "../controllers/base.controller";
import User, { IUser } from "../models/user.model";
import { BaseService } from "../services/base.service";
import BaseRouter from "./base.routes";

const router = Router();
const baseService = new BaseService<IUser>(User);
const baseController = new BaseController<IUser>(baseService);

const baseRouter = new BaseRouter<IUser>(baseController, {
  getOneByUser: true,
  // updateByUser: true,
}).router;

// Base Routes
router.use("/", baseRouter);

export default router;
