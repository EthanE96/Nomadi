import { FilterQuery } from "mongoose";
import { ValidationError, DatabaseError } from "../models/errors.model";
import Profile, { IProfile } from "../models/profile.model";
import { BaseService } from "./base.service";

export class ProfileService extends BaseService<IProfile> {
  constructor() {
    super(Profile);
  }

  /**
   * Find a document by the docUserId and user.
   * @param docUserId The document's userId.
   * @returns Promise resolving to the found document or null.
   */
  public async findProfile(docUserId: string): Promise<IProfile | null> {
    try {
      if (!docUserId || !docUserId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid profile's userID format");
      }

      return await Profile.findOne({ userId: docUserId } as FilterQuery<IProfile>).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to find user's profile`, error);
    }
  }

  /**
   * Update a document by the docUserId and user.
   * @param docUserId The document's userId.
   * @param updateData The data to update.
   * @returns Promise resolving to the updated document or null.
   */
  public async updateProfile(docUserId: string, updateData: Partial<IProfile>): Promise<IProfile | null> {
    try {
      if (!docUserId || !docUserId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid profile's userID format");
      }

      // Prevent updating _id field
      if (updateData && typeof updateData === "object" && "_id" in updateData) {
        delete updateData._id;
      }

      return await Profile.findOneAndUpdate({ userId: docUserId } as FilterQuery<IProfile>, updateData, {
        new: true,
        runValidators: true,
      }).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to update user's profile`, error);
    }
  }
}
