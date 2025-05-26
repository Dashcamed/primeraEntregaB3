import app from './app';
import { initializeMongo } from './app';
import config from './config/config';

const PORT = config.PORT;

initializeMongo();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
