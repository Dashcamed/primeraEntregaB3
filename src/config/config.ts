import { Command, Option } from 'commander';
let mode = 'dev'; // valor por defecto
const program = new Command();

program
  .addOption(new Option('--test <archivo>', 'Archivo de test a ejecutar'))
  .addOption(
    new Option('-m, --mode <MODE>', 'Modo de ejecución del server')
      .choices(['prod', 'dev'])
      .default('dev'),
  );

// Solo parsear si es entrypoint principal
if (process.argv[1] === __filename || require.main === module) {
  program.parse();
  mode = program.opts().mode;
} else {
  // Si se importa, usar valor por defecto o de variable de entorno
  mode = process.env.MODE || 'dev';
}

// Cargar archivo .env correspondiente
process.loadEnvFile(mode === 'prod' ? './.env.prod' : './.env.dev');

console.log('Options:', program.opts());
export default {
  PORT: Number(process.env.PORT) || 8080,
  MONGO_URL: process.env.MONGO_URL || '',
  COOKIE_SIGN: process.env.COOKIE_SIGN || '',
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || '',
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || 86400,
  FRONTEND_DEV_URL: process.env.FRONTEND_DEV_URL || '',
  mode: mode,
};
