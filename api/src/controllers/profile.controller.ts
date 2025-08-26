import { Request, Response } from "express";
import { IApiResponse } from "../models/api-response.model";
import { NotFoundError } from "../models/errors.model";
import { IProfile } from "../models/profile.model";
import { ProfileService } from "../services/profile.service";
import { BaseController } from "./base.controller";

export class ProfileController extends BaseController<IProfile> {
  constructor(private profileService: ProfileService) {
    super(profileService);
  }

  // ^ CRUD Methods
  /**
   * Get a document by ID for the authenticated user.
   * @route GET /profile
   */
  profileGetById = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const profile = await this.profileService.findProfile(userId);

    if (!profile) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: profile } as IApiResponse<IProfile>);
  };

  /**
   * Update a document by ID for the authenticated user.
   * @route PUT /profile
   */
  profileUpdateById = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const updateData: Partial<IProfile> = req.body;

    const updatedProfile = await this.profileService.updateProfile(userId, updateData);

    if (!updatedProfile) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: updatedProfile } as IApiResponse<IProfile>);
  };
}
