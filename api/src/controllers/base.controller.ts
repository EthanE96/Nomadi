import "express-async-errors";
import { Request, Response } from "express";
import { BaseService } from "../services/base.service";
import { IApiResponse } from "../models/api-response.model";
import { IUser } from "../models/user.model";
import { NotFoundError, UnauthorizedError } from "../models/errors.model";

/**
 * BaseController class that provides CRUD operations for a given service.
 * Assumes the service handles user-specific data and the user ID is extracted from the request session.
 * Utilizing express-async-error to handle async errors automatically.
 */
export class BaseController<T> {
  protected service: BaseService<T>;

  /**
   * Constructs an instance of BaseController.
   * @param service Instance of BaseService class
   */
  constructor(service: BaseService<T>) {
    this.service = service;
  }

  //^ Helper Methods
  /**
   * Extracts userId from authenticated user session and validates it.
   * If not authenticated, throws an UnauthorizedError.
   * @param req Express request object
   * @returns userId if valid, otherwise throws error
   */
  protected getUserId(req: Request): string {
    // Only trust the user from the session (set by Passport)
    const user = req.user as IUser;
    if (!user || !user.id) {
      throw new UnauthorizedError("Authentication required or user ID not found.");
    }
    return user.id;
  }

  // * GET Methods
  /**
   * Get all documents
   * @route GET /
   */
  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const documents = await this.service.findAll();

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: documents } as IApiResponse<T[]>);
  };

  /**
   * Get a document by ID
   * @route GET /:id
   */
  public getById = async (req: Request, res: Response): Promise<void> => {
    const document = await this.service.findById(req.params.id);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  /**
   * Get all documents for a specific user
   * @route GET /
   */
  public getAllByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const documents = await this.service.findAllByUser(userId);

    if (!documents) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: documents } as IApiResponse<T[]>);
  };

  /**
   * Get a document by the authenticated user's ID.
   * @route GET /
   */
  public getByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.findByUser(userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  // * CREATE Methods
  /**
   * Create one or more documents for the authenticated user.
   * @route POST /
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    let result: T | T[];

    if (Array.isArray(req.body)) {
      result = await this.service.createMany(req.body);
    } else {
      result = await this.service.create(req.body);
    }
    res.status(201).json({ success: true, data: result } as IApiResponse<T | T[]>);
  };

  /**
   * Create a document for a specific user (admin or system use).
   * @route POST /user/:userId
   */
  public createForUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    let result: T | T[];

    if (Array.isArray(req.body)) {
      result = await this.service.createManyForUser(req.body, userId);
    } else {
      result = await this.service.createForUser(req.body, userId);
    }

    res.status(201).json({ success: true, data: result } as IApiResponse<T>);
  };

  // * UPDATE Methods

  /**
   * Update a document by ID.
   * @route PATCH /:id
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    const document = await this.service.update(req.params.id, req.body);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  /**
   * Update a document by the authenticated user.
   * @route PATCH /
   */
  public updateByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.updateForUser(userId, req.body, userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  // * DELETE Methods

  /**
   * Delete a document by ID.
   * @route DELETE /:id
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    const document = await this.service.delete(req.params.id);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, message: "Document deleted." } as IApiResponse<null>);
  };

  /**
   * Delete a document by the authenticated user.
   * @route DELETE /
   */
  public deleteByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.deleteForUser(userId, userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, message: "Document deleted." } as IApiResponse<null>);
  };
}
