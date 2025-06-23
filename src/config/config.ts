import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.requiredOption('--mode <mode>', 'Mode', 'development mode required');

program.parse();

export const enviroment = program.opts().mode;

dotenv.config({
  path: `.env.${enviroment}`,
});

console.log('Options:', program.opts());
export default {
  MONGO_URL: process.env.MONGO_URL || '',
  PORT: Number(process.env.PORT) || 8080,
  COOKIE_SIGN: process.env.COOKIE_SIGN || '',
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || '',
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || 86400,
  FRONTEND_DEV_URL: process.env.FRONTEND_DEV_URL || '',
};
