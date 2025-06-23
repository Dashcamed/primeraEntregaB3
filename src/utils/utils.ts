import bcrypt from 'bcrypt';
import { UserModel } from '../interfaces/interfaces';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateHash = async (password: string) =>
  await bcrypt.hash(password, bcrypt.genSaltSync(10));

export const isValidPassword = (
  user: Pick<UserModel, 'password'>,
  password: string,
) => {
  if (!user || !user.password || !password) {
    return false;
  }
  const result = bcrypt.compareSync(password, user.password.toString());
  return result;
};

export const passportCall = (strategy: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      strategy,
      function (err: Error, user: UserModel, info: any) {
        if (err) return next(err);
        if (!user) {
          res
            .status(401)
            .send({ error: info.messages ? info.messages : info.toString() });
          return;
        }
        req.user = user;
        next();
      },
    )(req, res, next);
  };
};

export const authorization = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).send({ message: 'No autorizado' });
      return;
    }
    if ((req.user as UserModel).role != role) {
      res.status(403).send({ error: 'No tienes permiso' });
      return;
    }
    next();
  };
};

export const generateOrderCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomLetters = Array.from(
    { length: 5 },
    () => letters[Math.floor(Math.random() * letters.length)],
  ).join('');

  const randomNumbers = Array.from(
    { length: 5 },
    () => numbers[Math.floor(Math.random() * numbers.length)],
  ).join('');

  return randomLetters + randomNumbers;
};
