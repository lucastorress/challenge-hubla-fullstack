import swaggerAutogen = require('swagger-autogen');
import path = require('path');

import doc from './v1';

const outputFile = path.join(__dirname, 'swagger_output.json');
const endpointsFiles = [path.join(__dirname, '..', 'routes.ts')];

swaggerAutogen()(outputFile, endpointsFiles, doc);
