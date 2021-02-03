// avoid problems with nodemon
if (process.env.NODEMON !== 'development') {
  require('module-alias/register');
}

import App from '@app/app';
import { PORT } from '@config/environment';

App.start(PORT);
