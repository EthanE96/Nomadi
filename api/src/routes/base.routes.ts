import { Router } from "express";
import { BaseController } from "../controllers/base.controller"; // Adjust path as needed

// Configuration interface for enabling/disabling routes
interface RouteConfig {
  /** Enable GET / route for retrieving all documents */
  getAll?: boolean;
  /** Enable GET /:id route for retrieving a single document by ID */
  getOne?: boolean;
  /** Enable GET / route for retrieving all documents for the authenticated user */
  getAllByUser?: boolean;
  /** Enable GET /:id route for retrieving a single document by ID for the authenticated user */
  getOneByUser?: boolean;
  /** Enable GET / route for retrieving a single document for the authenticated user (1:1)*/
  getOneOfUser?: boolean;

  /** Enable POST / route for creating new documents */
  create?: boolean;
  /** Enable POST / route for creating new documents for the authenticated user */
  createForUser?: boolean;

  /** Enable PATCH /:id route for updating a document by ID */
  update?: boolean;
  /** Enable PATCH /:id route for updating a document by ID for the authenticated user */
  updateByUser?: boolean;
  /** Enable PATCH / route for updating a document for the authenticated user (1:1) */
  updateOfUser?: boolean;

  /** Enable DELETE /:id route for deleting a document by ID */
  delete?: boolean;
  /** Enable DELETE /:id route for deleting a document by ID for the authenticated user */
  deleteByUser?: boolean;
  /** Enable DELETE / route for deleting a document for the authenticated user (1:1) */
  deleteOfUser?: boolean;
}

export class BaseRouter<T> {
  public router: Router;
  protected controller: BaseController<T>;
  private routeConfig: RouteConfig;

  /**
   * @param controller Instance of BaseController class
   * @param config Optional configuration to enable/disable specific routes
   * @description Constructs an instance of BaseRouter and sets up CRUD routes based on config
   */
  constructor(controller: BaseController<T>, config: RouteConfig = {}) {
    this.router = Router();
    this.controller = controller;

    // Default to enabling all routes if not specified
    this.routeConfig = {
      getAll: config.getAll ?? false,
      getOne: config.getOne ?? false,
      getAllByUser: config.getAllByUser ?? false,
      getOneByUser: config.getOneByUser ?? false,
      getOneOfUser: config.getOneOfUser ?? false,

      create: config.create ?? false,
      createForUser: config.createForUser ?? false,

      update: config.update ?? false,
      updateByUser: config.updateByUser ?? false,
      updateOfUser: config.updateOfUser ?? false,

      delete: config.delete ?? false,
      deleteByUser: config.deleteByUser ?? false,
      deleteOfUser: config.deleteOfUser ?? false,
    };

    this.initializeRoutes();
  }

  /**
   * @description Initializes the CRUD routes based on the routeConfig
   */
  protected initializeRoutes(): void {
    //* Get Routes
    if (this.routeConfig.getAll) {
      this.router.get("/", this.controller.getAll);
    }

    if (this.routeConfig.getOne) {
      this.router.get("/:id", this.controller.getOne);
    }

    if (this.routeConfig.getAllByUser) {
      this.router.get("/", this.controller.getAllByUser);
    }

    if (this.routeConfig.getOneByUser) {
      this.router.get("/:id", this.controller.getOneByUser);
    }

    if (this.routeConfig.getOneOfUser) {
      this.router.get("/", this.controller.getOneOfUser);
    }

    //* Create Routes
    if (this.routeConfig.create) {
      this.router.post("/", this.controller.create);
    }

    if (this.routeConfig.createForUser) {
      this.router.post("/", this.controller.createForUser);
    }

    //* Update Routes
    if (this.routeConfig.update) {
      this.router.patch("/:id", this.controller.update);
    }

    if (this.routeConfig.updateByUser) {
      this.router.patch("/:id", this.controller.updateByUser);
    }

    if (this.routeConfig.updateOfUser) {
      this.router.patch("/", this.controller.updateOfUser);
    }

    //* Delete Routes
    if (this.routeConfig.delete) {
      this.router.delete("/:id", this.controller.delete);
    }

    if (this.routeConfig.deleteByUser) {
      this.router.delete("/:id", this.controller.deleteByUser);
    }

    if (this.routeConfig.deleteOfUser) {
      this.router.delete("/", this.controller.deleteOfUser);
    }
  }
}

export default BaseRouter;
