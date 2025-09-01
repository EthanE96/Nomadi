import { ModelService } from "../ai/model.ai";
import { StructureService } from "../ai/structure.ai";
import { ChatGroq } from "@langchain/groq";

type TripDependencies = {
  aiModel: ChatGroq;
  tripStructure: any;
  tripNodeStructure: any;
};

let cachedDependencies: TripDependencies | null = null;
let lastLoaded: number | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Get the trip dependencies (AI model and structures), using an in-memory cache to reduce initialization time.
 * Will fetch and initialize if cache is empty, expired, or forceRefresh is true.
 * @param forceRefresh If true, always reload and reinitialize.
 * @returns {Promise<TripDependencies>} The trip dependencies including AI model and structures.
 */
export async function getTripDependencies(forceRefresh = false): Promise<TripDependencies> {
  const now = Date.now();
  if (cachedDependencies && lastLoaded && !forceRefresh && now - lastLoaded < CACHE_TTL_MS) {
    return cachedDependencies;
  }

  const modelService = new ModelService();
  const structureService = new StructureService();

  const aiModel = await modelService.initializeModel();
  const tripStructure = structureService.tripStructure();
  const tripNodeStructure = structureService.tripNodeStructure();

  cachedDependencies = { aiModel, tripStructure, tripNodeStructure };
  lastLoaded = now;
  return cachedDependencies;
}

/**
 * Clear the in-memory cache for trip dependencies.
 */
export function clearTripDependenciesCache() {
  cachedDependencies = null;
  lastLoaded = null;
}
