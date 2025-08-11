import mongoose, { Document, Schema } from "mongoose";

//^ Interfaces
export interface IGlobalSettings extends Document {
  name: string;
  featureFlags: IFeatureFlags;
  maxRateLimit: IMaxRateLimit;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Allow any string key with boolean value for feature flags
export interface IFeatureFlags {
  [key: string]: boolean;
}

export interface IMaxRateLimit {
  windowMinutes: number;
  maxRequests: number;
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
  },
  {
    timestamps: true,
    collection: "global_settings",
  }
);

export default mongoose.model<IGlobalSettings>("GlobalSettings", GlobalSettingsSchema);
