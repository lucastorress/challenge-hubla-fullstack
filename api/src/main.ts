import express = require('express');
import { router } from './routes';

import swaggerUi = require('swagger-ui-express');
import swaggerDocument = require('./docs/swagger_output.json');

import helmet from 'helmet';
import compression = require('compression');
import morgan = require('morgan');
import cors = require('cors');

import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  '/',
  router.get('/', (request, response) => {
    response.redirect(301, '/api-docs');
  }),
);
app.use('/v1', router);

export { app };
