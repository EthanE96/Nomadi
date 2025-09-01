import mongoose, { Document, Schema } from "mongoose";

//^ Interfaces
export interface IGlobalSettings extends Document {
  name: string;
  featureFlags: IFeatureFlags;
  maxRateLimit: IMaxRateLimit;
  aiModel: IAIModel;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeatureFlags {
  [key: string]: boolean;
}

export interface IMaxRateLimit {
  windowMinutes: number;
  maxRequests: number;
}

export interface IAIModel {
  modelName: string;
  maxTokens: number;
  temperature: number;
}

//^ Schema
const GlobalSettingsSchema = new Schema<IGlobalSettings>(
  {
    name: { type: String, required: true, unique: true },
    featureFlags: {
      type: Map,
      of: Boolean,
      required: false,
      default: {},
    },
    maxRateLimit: {
      windowMinutes: { type: Number, required: true, default: 15 },
      maxRequests: { type: Number, required: true, default: 100 },
    },
    aiModel: {
      modelName: { type: String, required: true, default: "llama-3.3-70b-versatile" },
      maxTokens: { type: Number, required: true, default: 2048 },
      temperature: { type: Number, required: true, default: 0.7 },
    },
  },
  {
    timestamps: true,
    collection: "global_settings",
  }
);

export default mongoose.model<IGlobalSettings>("GlobalSettings", GlobalSettingsSchema);
