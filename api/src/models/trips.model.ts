import mongoose, { Schema } from "mongoose";

//^ Interface
export interface ITrip {
  _id?: string;
  userId: string;

  destination: string;
  startDate: Date;
  endDate: Date;
  description: string;
  abbreviation: string;
  tripNodes: ITripNodes[];

  createdAt: Date;
  updatedAt: Date;
}

export interface ITripNodes {
  _id?: string;
  date: Date;
  description: string;

  createdAt: Date;
  updatedAt: Date;
}

//^ Schema
const tripSchema = new Schema<ITrip>(
  {
    userId: { type: String, ref: "User", required: true },

    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    abbreviation: { type: String, required: true, maxlength: 5 },
    tripNodes: [
      {
        date: { type: Date, required: true },
        description: { type: String, required: true },

        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "trips" }
);

export default mongoose.model<ITrip>("Trip", tripSchema);
