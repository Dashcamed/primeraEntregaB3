import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import MockRouter from './routes/mock.router';
import UserRouter from './routes/user.router';
import PetRouter from './routes/pet.router';
import SessionRouter from './routes/session.router';
import { middLogg } from './config/logger';
import { __dirname } from './utils/utils';
import passport from 'passport';
import initializePassport from './config/passport.config';
import { enviroment } from './config/config';
import cors from 'cors';
import { logger } from './config/logger';
import morgan from 'morgan';
import swaggerSetup from './config/swagger';

const app = express();
const morganLogger = morgan('dev');
const URL_MONGO = config.MONGO_URL;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(middLogg);
app.use(morganLogger);

//Swagger
swaggerSetup(app);

//Routes
app.use('/api/mock', new MockRouter().getRouter());
app.use('/api/user', new UserRouter().getRouter());
app.use('/api/pet', new PetRouter().getRouter());
app.use('/api/auth', new SessionRouter().getRouter());

//Passport
initializePassport();
app.use(passport.initialize());

//CORS
const allowedOrigins = [config.FRONTEND_DEV_URL];
const allowedDevOrigins = [config.FRONTEND_DEV_URL];

app.use(
  cors({
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        (enviroment === 'dev' && allowedDevOrigins.includes(origin)) ||
        (enviroment === 'prod' && origin === config.FRONTEND_DEV_URL)
      ) {
        callback(null, true);
      } else {
        logger.error(`CORS bloqueado para origen: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
logger.info('CORS enabled for:', allowedOrigins);

//Mongo
export const initializeMongo = async () => {
  try {
    await mongoose.connect(URL_MONGO);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default app;
