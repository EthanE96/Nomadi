import { Model } from "mongoose";
import { ITrip } from "../models/trips.model";
import { BaseService } from "./base.service";
import { getTripDependencies } from "../utils/ai-dependencies-cache.utils";
import { ITripNodeStructure, ITripStructure } from "../ai/structure.ai";
import { getTripTemplate } from "../ai/templates.ai";

export class TripService extends BaseService<ITrip> {
  protected model: Model<ITrip>;

  constructor(model: any) {
    super(model);
    this.model = model;
  }

  public async createTrip(userId: string, trip: Partial<ITrip>): Promise<ITrip> {
    const { aiModel, tripStructure, tripNodeStructure } = await getTripDependencies();

    //* Step 1: Generate trip overview

    // Create output parsers
    const tripLLM = aiModel.withStructuredOutput(tripStructure, { name: "Trip" });

    // Inject user preferences into the prompt

    // Invoke LLM to get trip overview
    const tripResponse = await tripLLM.invoke(getTripTemplate());

    // Extract structured trip data
    const tripData = tripResponse.output as ITripStructure;

    //* Step 2: Generate trip nodes (many)
    const tripNodeLLM = aiModel.withStructuredOutput(tripNodeStructure, { name: "Trip Node" });
    const tripNodeResponse = await tripNodeLLM.invoke(getTripTemplate());
    const tripNodeData = tripNodeResponse.output as ITripNodeStructure;

    //* Step 3: Assemble final trip object

    return await this.create({ ...trip, userId: userId });
  }
}
