import passport from 'passport';
import jwt from 'passport-jwt';
import config from '../config/config.js';
import { Request } from 'express';

const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY;

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_PRIVATE_KEY,
      },
      async (jwt_payload: any, done: any) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};

export default initializePassport;
