import { Router } from "express";
import BaseRouter from "./base.routes";
import Profile, { IProfile } from "../models/profile.model";
import { BaseService } from "../services/base.service";
import { BaseController } from "../controllers/base.controller";

const router = Router();
const profileController = new BaseController(new BaseService(Profile));

const baseRouter = new BaseRouter<IProfile>(profileController, {
  getById: true,
  update: true,

  getAll: false,
  create: false,
  delete: false,
  deleteAll: false,
}).router;

// Base Routes
router.use("/", baseRouter);

export default router;
