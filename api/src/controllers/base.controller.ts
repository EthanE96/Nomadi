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
   * Extracts userId from authenticated user session and validates it
   * If not authenticated, throws an UnauthorizedError
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
    const documents = await this.service.getAll();

    if (!documents) {
      throw new NotFoundError("No documents found.");
    }

    res.json({ success: true, data: documents } as IApiResponse<T[]>);
  };

  /**
   * Get a document by ID
   * @route GET /:id
   */
  public getOne = async (req: Request, res: Response): Promise<void> => {
    const document = await this.service.getOne(req.params.id);

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
    const documents = await this.service.getAllByUser(userId);

    if (!documents) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: documents } as IApiResponse<T[]>);
  };

  /**
   * Get a document by ID for a specific user
   * @route GET /:id
   */
  public getOneByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.getOneByUser(req.params.id, userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }

    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  /**
   * Get a document for the authenticated user
   * @route GET /
   */
  public getOneOfUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.getOneOfUser(userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  // * CREATE Methods
  /**
   * Create one or more documents for a specific user
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
   * Create a document for a specific user
   * @route POST /
   */
  public createForUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    let result: T | T[];

    if (Array.isArray(req.body)) {
      result = await this.service.createManyForUser(userId, req.body);
    } else {
      result = await this.service.createForUser(userId, req.body);
    }

    res.status(201).json({ success: true, data: result } as IApiResponse<T>);
  };

  // * UPDATE Methods
  /**
   * Update a document by ID
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
   * Update a document by ID for a specific user
   * @route PATCH /:id
   */
  public updateForUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.updateForUser(req.params.id, userId, req.body);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  /**
   * Update a document for the authenticated user
   * @route PATCH /
   */
  public updateOfUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.updateOfUser(userId, req.body);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, data: document } as IApiResponse<T>);
  };

  // * DELETE Methods
  /**
   * Delete a document by ID
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
   * Delete a document by ID for a specific user
   * @route DELETE /:id
   */
  public deleteForUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.deleteForUser(req.params.id, userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, message: "Document deleted." } as IApiResponse<null>);
  };

  /**
   * Delete a document for the authenticated user
   * @route DELETE /
   */
  public deleteOfUser = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const document = await this.service.deleteOfUser(userId);

    if (!document) {
      throw new NotFoundError("Document not found for the authenticated user.");
    }
    res.json({ success: true, message: "Document deleted." } as IApiResponse<null>);
  };
}
