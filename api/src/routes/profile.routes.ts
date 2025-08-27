import { Router } from "express";
import { BaseController } from "../controllers/base.controller";
import Profile, { IProfile } from "../models/profile.model";
import { BaseService } from "../services/base.service";
import BaseRouter from "./base.routes";

const router = Router();
const baseService = new BaseService<IProfile>(Profile);
const baseController = new BaseController<IProfile>(baseService);

const baseRouter = new BaseRouter<IProfile>(baseController, {
  getOneOfUser: true,
  updateOfUser: true,
}).router;

// Base Routes
router.use("/", baseRouter);

export default router;
