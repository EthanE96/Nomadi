// Seed data for global settings in the application
import { IGlobalSettings } from "../../../models/global-settings.model";

export const globalSettingsData: Partial<IGlobalSettings> = {
  name: "development",
  featureFlags: {},
  maxRateLimit: {
    windowMinutes: 1,
    maxRequests: 20,
  },
  aiModel: {
    modelName: "llama-3.3-70b-versatile",
    maxTokens: 2048,
    temperature: 0.7,
  },
};
