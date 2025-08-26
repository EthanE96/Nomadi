import mongoose, { Schema, Document } from "mongoose";

//^ Interface
export enum UserType {
  DigitalNomad = "Digital Nomad",
  LongTermTraveler = "Long-term Traveler",
  Vacationer = "Vacationer",
}

export enum GenderType {
  Male = "Male",
  Female = "Female",
  NoAnswer = "Prefer not to say",
}

export enum SafetyLevel {
  Low = "Low Risk",
  Moderate = "Moderate Risk",
  High = "High Risk / Adventure Seeker",
}

export enum TravelExperience {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Experienced = "Experienced",
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface IProfile extends Document {
  _id: string;
  userId: string;

  // Personal and Travel
  userType: UserType;
  age: number;
  gender: GenderType;
  nationality: string;
  languagesSpoken: string[];
  safetyLevel: SafetyLevel;
  travelExperience: TravelExperience;
  additionalInfo?: string;

  // Interests and Activities
  adventure: Rating;
  culture: Rating;
  food: Rating;
  cityLife: Rating;
  nightlife: Rating;
  nature: Rating;
  spontaneity: Rating;
}

//^ Schema
const ProfileSchema = new Schema<IProfile>(
  {
    userId: { type: String, ref: "User", required: true, unique: true },
    userType: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },

    // Personal and Travel
    age: { type: Number, required: true, min: 0, max: 80 },
    gender: {
      type: String,
      enum: Object.values(GenderType),
      required: true,
    },
    nationality: { type: String, required: true },
    languagesSpoken: { type: [String], required: true, default: ["English"] },
    safetyLevel: {
      type: String,
      enum: Object.values(SafetyLevel),
      required: true,
    },
    travelExperience: {
      type: String,
      enum: Object.values(TravelExperience),
      required: true,
    },
    additionalInfo: { type: String, required: false },

    // Interests and Activities
    adventure: { type: Number, min: 1, max: 5, required: true },
    culture: { type: Number, min: 1, max: 5, required: true },
    food: { type: Number, min: 1, max: 5, required: true },
    cityLife: { type: Number, min: 1, max: 5, required: true },
    nightlife: { type: Number, min: 1, max: 5, required: true },
    nature: { type: Number, min: 1, max: 5, required: true },
    spontaneity: { type: Number, min: 1, max: 5, required: true },
  },
  {
    timestamps: true,
    collection: "profiles",
  }
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
