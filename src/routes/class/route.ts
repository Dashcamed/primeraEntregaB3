import {
  Router as ExpressRouter,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { middLogg } from '../../config/logger';
import multer from 'multer';
import { __dirname } from '../../utils/utils';
import config from '../../config/config';
import jwt from 'jsonwebtoken';

export default class Router {
  router: ExpressRouter;

  uploadDocument = multer({ dest: __dirname + '/public/document' });
  uploadPet = multer({ dest: __dirname + '/public/pet' });

  constructor() {
    this.router = ExpressRouter();
    this.init();
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

  get(path: string, policies: string[], ...callbacks: any[]) {
    this.router.get(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks),
    );
  }

  put(path: string, policies: string[], ...callbacks: any[]) {
    this.router.put(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.uploadDocument.single('document'),
      this.uploadPet.single('pet'),
      this.applyCallbacks(callbacks),
    );
  }

  patch(path: string, policies: string[], ...callbacks: any[]) {
    this.router.patch(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.uploadDocument.single('document'),
      this.uploadPet.single('pet'),
      this.applyCallbacks(callbacks),
    );
  }

  post(path: string, policies: string[], ...callbacks: any[]) {
    this.router.post(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.uploadDocument.single('document'),
      this.uploadPet.single('pet'),
      this.applyCallbacks(callbacks),
    );
  }

  delete(path: string, policies: string[], ...callbacks: any[]) {
    this.router.delete(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks),
    );
  }

  handlePolicies = (policies: string[]): RequestHandler => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        if (policies[0] === 'PUBLIC') {
          next();
          return;
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          res.status(401).json({
            status: 'error',
            message: 'No token provided',
          });
          return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
          res.status(401).json({
            status: 'error',
            message: 'Invalid token format',
          });
          return;
        }
        let user;
        try {
          user = jwt.verify(token, config.JWT_PRIVATE_KEY);
        } catch (error) {
          res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token',
          });
          return;
        }
        const userRole = (user as any)?.role;

        if (
          !userRole ||
          !policies.some(
            (policy) => userRole.toUpperCase() === policy.toUpperCase(),
          )
        ) {
          console.log('Access denied - User role not in required policies');
          res.status(403).json({
            error: 'No tienes permisos para acceder a esta ruta',
            requiredRoles: policies,
            userRole: userRole,
          });
          return;
        }
        req.user = user;
        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
