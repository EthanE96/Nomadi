import { Router } from "express";
import { BaseController } from "../controllers/base.controller"; // Adjust path as needed

// Configuration interface for enabling/disabling routes
interface RouteConfig {
  getAll?: boolean;
  getById?: boolean;
  getByUser?: boolean;
  getAllByUser?: boolean;

  create?: boolean;
  createForUser?: boolean;

  update?: boolean;
  updateByUser?: boolean;

  delete?: boolean;
  deleteByUser?: boolean;
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
      getById: config.getById ?? false,
      getByUser: config.getByUser ?? false,
      getAllByUser: config.getAllByUser ?? false,

      create: config.create ?? false,
      createForUser: config.createForUser ?? false,

      update: config.update ?? false,
      updateByUser: config.updateByUser ?? false,

      delete: config.delete ?? false,
      deleteByUser: config.deleteByUser ?? false,
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

    if (this.routeConfig.getById) {
      this.router.get("/:id", this.controller.getById);
    }

    if (this.routeConfig.getAllByUser) {
      this.router.get("/", this.controller.getAllByUser);
    }

    if (this.routeConfig.getByUser) {
      this.router.get("/user/:userId", this.controller.getByUser);
    }

    //* Create Routes
    if (this.routeConfig.create) {
      this.router.post("/", this.controller.create);
    }

    if (this.routeConfig.createForUser) {
      this.router.post("/user/:userId", this.controller.createForUser);
    }

    //* Update Routes
    if (this.routeConfig.update) {
      this.router.patch("/:id", this.controller.update);
    }

    if (this.routeConfig.updateByUser) {
      this.router.patch("/user/:userId", this.controller.updateByUser);
    }

    //* Delete Routes
    if (this.routeConfig.delete) {
      this.router.delete("/:id", this.controller.delete);
    }

    if (this.routeConfig.deleteByUser) {
      this.router.delete("/user/:userId", this.controller.deleteByUser);
    }
  }
}

export default BaseRouter;
