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
};
