import { Router } from "express";
import Trip, { ITrip } from "../models/trip.model";
import { BaseController } from "../controllers/base.controller";
import { BaseService } from "../services/base.service";
import BaseRouter from "./base.routes";

const router = Router();
const baseService = new BaseService<ITrip>(Trip);
const baseController = new BaseController<ITrip>(baseService);

const baseRouter = new BaseRouter<ITrip>(baseController, {}).router;

// Base Routes
router.use("/", baseRouter);

export default router;
