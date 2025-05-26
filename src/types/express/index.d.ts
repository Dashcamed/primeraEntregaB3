import { Logger } from 'winston';

declare global {
  namespace Express {
    interface Request {
      logger: Logger;
    }
    interface Response {
      logger: Logger;
    }
  }
}
