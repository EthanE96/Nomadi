import { Model, FilterQuery, UpdateQuery } from "mongoose";
import { DatabaseError, ValidationError, ConflictError, InternalServerError } from "../models/errors.model";

/**
 * BaseService class that provides CRUD operations for a given Mongoose model.
 * This class is generic and can be used with any Mongoose model.
 * It includes methods for basic CRUD operations, as well as user-specific operations.
 */
export class BaseService<T> {
  protected model: Model<T>;

  /**
   * Constructs an instance of BaseService
   * @param model Mongoose model instance
   */
  constructor(model: Model<T>) {
    this.model = model;
  }

  // * GET Methods
  /**
   * Get all documents
   * @returns Promise resolving to an array of documents
   */
  public async getAll(): Promise<T[]> {
    try {
      return await this.model.find().exec();
    } catch (error: unknown) {
      throw new DatabaseError(`Failed to fetch documents`, error);
    }
  }

  /**
   * Get a document by ID
   * @param id The document ID
   * @returns Promise resolving to the found document or null
   */
  public async getOne(id: string): Promise<T | null> {
    try {
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid document ID format");
      }

      return await this.model.findById(id).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to fetch document`, error);
    }
  }

  /**
   * Get all documents for a specific user
   * @param userId The user's ID
   * @returns Promise resolving to an array of documents
   */
  public async getAllByUser(userId: string): Promise<T[]> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      return await this.model.find({ userId }).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to fetch user documents`, error);
    }
  }

  /**
   * Get a document by ID and the authenticated user's ID
   * @param id The document ID
   * @param userId The user's ID
   * @returns Promise resolving to the found document or null
   */
  public async getOneByUser(id: string, userId: string): Promise<T | null> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      return await this.model.findOne({ _id: id, userId: userId }).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to find user document`, error);
    }
  }

  /**
   * Get a single document for a specific user (assumes one document per user)
   * @param userId The user's ID
   * @returns Promise resolving to the found document or null
   */
  public async getOneOfUser(userId: string): Promise<T | null> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      return await this.model.findOne({ userId: userId }).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to find user document`, error);
    }
  }

  // * CREATE Methods
  /**
   * Create a new document
   * @param data The document data
   * @returns Promise resolving to the created document
   */
  public async create(data: Partial<T>): Promise<T> {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new ValidationError("Document data cannot be empty");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      const document = new this.model(data);
      return (await document.save()) as T;
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        throw new ConflictError("Document with this data already exists");
      }

      throw new InternalServerError(`Failed to create document`, error);
    }
  }
  /**
   * Create a document for a specific user
   * @param userId The user's ID
   * @param data The document data
   * @returns Promise resolving to the created document
   */
  public async createForUser(userId: string, data: Partial<T>): Promise<T> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      if (!data || Object.keys(data).length === 0) {
        throw new ValidationError("Document data cannot be empty");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      const document = new this.model({ ...data, userId });
      return (await document.save()) as T;
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        throw new ConflictError("Document with this data already exists for user");
      }

      throw new InternalServerError(`Failed to create user document`, error);
    }
  }

  /**
   * Create many documents
   * @param data Array of document data
   * @returns Promise resolving to an array of created documents
   */
  public async createMany(data: Partial<T>[]): Promise<T[]> {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new ValidationError("Data must be a non-empty array");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      const documents = await this.model.insertMany(data);
      return documents as T[];
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        throw new ConflictError("One or more documents already exist");
      }

      throw new InternalServerError(`Failed to create documents`, error);
    }
  }

  /**
   * Create multiple documents for a specific user
   * @param userId The user's ID
   * @param data Array of document data
   * @returns Promise resolving to an array of created documents
   */
  public async createManyForUser(userId: string, data: Partial<T>[]): Promise<T[]> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new ValidationError("Data must be a non-empty array");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      const documents = await this.model.insertMany(data.map((d) => ({ ...d, userId })));
      return documents as T[];
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        throw new ConflictError("One or more documents already exist for user");
      }

      throw new InternalServerError(`Failed to create user documents`, error);
    }
  }

  // * UPDATE Methods
  /**
   * Update a document by its ID
   * @param id The document ID
   * @param data The update data (Mongoose update query)
   * @returns Promise resolving to the updated document or null
   */
  public async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid document ID format");
      }

      if (!data || Object.keys(data).length === 0) {
        throw new ValidationError("Update data cannot be empty");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      return await this.model
        .findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      throw new InternalServerError(`Failed to update document`, error);
    }
  }

  /**
   * Update a document by ID for a specific user
   * @param id The document ID
   * @param userId The user's ID
   * @param data The update data (Mongoose update query)
   * @returns Promise resolving to the updated document or null
   */
  public async updateForUser(id: string, userId: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid document ID format");
      }

      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      if (!data || Object.keys(data).length === 0) {
        throw new ValidationError("Update data cannot be empty");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      return await this.model
        .findOneAndUpdate({ _id: id, userId: userId } as FilterQuery<T>, data, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      throw new InternalServerError(`Failed to update user document`, error);
    }
  }

  /**
   * Update a document for a specific user (assumes one document per user)
   * @param userId The user's ID
   * @param data The update data (Mongoose update query)
   * @returns Promise resolving to the updated document or null
   */
  public async updateOfUser(userId: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      if (!data || Object.keys(data).length === 0) {
        throw new ValidationError("Update data cannot be empty");
      }

      // Prevent updating _id field
      if (data && typeof data === "object" && "_id" in data) {
        delete data._id;
      }

      return await this.model
        .findOneAndUpdate({ userId: userId } as FilterQuery<T>, data, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;

      if (error instanceof Error && error.name === "ValidationError") {
        throw new ValidationError(`Validation failed: ${error.message}`);
      }

      throw new InternalServerError(`Failed to update user document`, error);
    }
  }

  /**
   * Delete a document by its ID
   * @param id The document ID
   * @returns Promise resolving to the deleted document or null
   */
  public async delete(id: string): Promise<T | null> {
    try {
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid document ID format");
      }

      return await this.model.findByIdAndDelete(id).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new InternalServerError(`Failed to delete document`, error);
    }
  }

  /**
   * Delete a document by ID for a specific user
   * @param id The document ID
   * @param userId The user's ID.
   * @returns Promise resolving to the deleted document or null.
   */
  public async deleteForUser(id: string, userId: string): Promise<T | null> {
    try {
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid document ID format");
      }

      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      return await this.model.findOneAndDelete({ _id: id, userId: userId } as FilterQuery<T>).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new InternalServerError(`Failed to delete user document`, error);
    }
  }

  /**
   * Delete a document for a specific user (assumes one document per user)
   * @param userId The user's ID
   * @returns Promise resolving to the deleted document or null
   */
  public async deleteOfUser(userId: string): Promise<T | null> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      return await this.model.findOneAndDelete({ userId: userId } as FilterQuery<T>).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new InternalServerError(`Failed to delete user document`, error);
    }
  }

  /**
   * Delete all documents
   * @returns Promise resolving when deletion is complete
   */
  public async deleteAll(): Promise<void> {
    try {
      await this.model.deleteMany({}).exec();
    } catch (error: unknown) {
      throw new DatabaseError(`Failed to delete all documents`, error);
    }
  }

  /**
   * Delete all documents for a specific user
   * @param userId The user's ID
   * @returns Promise resolving when deletion is complete
   */
  public async deleteAllForUser(userId: string): Promise<void> {
    try {
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError("Invalid user ID format");
      }

      await this.model.deleteMany({ userId } as FilterQuery<T>).exec();
    } catch (error: unknown) {
      if (error instanceof ValidationError) throw error;
      throw new DatabaseError(`Failed to delete all user documents`, error);
    }
  }
}

//^ User-specific methods
