import { BaseController } from "./base.controller";
import { ITrip } from "../models/trips.model";
import { Request, Response } from "express";
import { IApiResponse } from "../models/api-response.model";

export class TripController extends BaseController<ITrip> {
  async createTrip(req: Request, res: Response): Promise<void> {
    res.json({ success: true, data: `Working, Trip location: ${req.body.destination}` } as IApiResponse<string>);
  }

  async generateTripDetails(req: Request, res: Response): Promise<void> {
    res.json({ success: true, data: `Working, Trip id: ${req.params.id}` } as IApiResponse<string>);
  }
}
