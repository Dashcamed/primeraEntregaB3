import {
  Router as ExpressRouter,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { middLogg } from '../../config/logger';

export default class Router {
  router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCallbacks(callbacks: any[]): RequestHandler {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const params = [req, res, next];
        for (const callback of callbacks) {
          await callback.apply(this, params);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    };
  }

  get(path: string, ...callbacks: any[]) {
    this.router.get(path, middLogg, this.applyCallbacks(callbacks));
  }

  put(path: string, ...callbacks: any[]) {
    this.router.put(path, middLogg, this.applyCallbacks(callbacks));
  }

  post(path: string, ...callbacks: any[]) {
    this.router.post(path, middLogg, this.applyCallbacks(callbacks));
  }

  delete(path: string, ...callbacks: any[]) {
    this.router.delete(path, middLogg, this.applyCallbacks(callbacks));
  }
}
