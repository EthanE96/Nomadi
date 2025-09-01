import { BaseController } from "./base.controller";
import { ITrip } from "../models/trips.model";
import { Request, Response } from "express";
import { IApiResponse } from "../models/api-response.model";
import { TripService } from "../services/trip.service";
import { NotFoundError } from "../models/errors.model";

export class TripController extends BaseController<ITrip> {
  protected service: TripService;

  constructor(service: TripService) {
    super(service);
    this.service = service;
  }

  createTrip = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);

    const trip = await this.service.createTrip(userId, req.body);
    if (!trip) {
      throw new NotFoundError("Trip could not be created.");
    }

    res.json({ success: true, data: trip } as IApiResponse<ITrip>);
  };

  generateTripDetails = async (req: Request, res: Response): Promise<void> => {
    res.json({ success: true, data: `Working, Trip id: ${req.params.id}` } as IApiResponse<string>);
    // this.service.getAll();
  };
}
