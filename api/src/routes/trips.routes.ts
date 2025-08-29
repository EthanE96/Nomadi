import { Router } from "express";
import Trip, { ITrip } from "../models/trips.model";
import BaseRouter from "./base.routes";
import { TripController } from "../controllers/trip.controller";
import { TripService } from "../services/trip.service";

const router = Router();
const tripService = new TripService(Trip);
const tripController = new TripController(tripService);
const baseRouter = new BaseRouter<ITrip>(tripController, {
  getAllByUser: true,
  deleteForUser: true,
}).router;

// Trip Base Routes
router.use("/", baseRouter);

// Trip Creation
router.post("/", tripController.createTrip);

// Trip Details Generation
router.post("/:id/generate", tripController.generateTripDetails);

export default router;
