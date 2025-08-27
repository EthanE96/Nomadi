import { Router } from "express";
import { BaseController } from "../controllers/base.controller"; // Adjust path as needed

// Configuration interface for enabling/disabling routes
interface RouteConfig {
  getAll?: boolean;
  getOne?: boolean;
  getAllByUser?: boolean;
  getOneByUser?: boolean;

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
      getOne: config.getOne ?? false,
      getAllByUser: config.getAllByUser ?? false,
      getOneByUser: config.getOneByUser ?? false,

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

    if (this.routeConfig.getOne) {
      this.router.get("/:id", this.controller.getOne);
    }

    if (this.routeConfig.getAllByUser) {
      this.router.get("/", this.controller.getAllByUser);
    }

    if (this.routeConfig.getOneByUser) {
      this.router.get("/:id", this.controller.getOneByUser);
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

    //* Delete Routes
    if (this.routeConfig.delete) {
      this.router.delete("/:id", this.controller.delete);
    }

    if (this.routeConfig.deleteByUser) {
      this.router.delete("/:id", this.controller.deleteByUser);
    }
  }
}

export default BaseRouter;
