import app from './app';
import { initializeMongo } from './app';
import config from './config/config';
import { logger } from './config/logger';

const PORT = config.PORT;

initializeMongo();

app.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});
