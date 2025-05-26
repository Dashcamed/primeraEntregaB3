import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import MockRouter from './routes/mock.router';
import UserRouter from './routes/user.router';
import PetRouter from './routes/pet.router';
import { middLogg } from './config/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mock', new MockRouter().getRouter());
app.use('/api/user', new UserRouter().getRouter());
app.use('/api/pet', new PetRouter().getRouter());
app.use(middLogg);

export const initializeMongo = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default app;
