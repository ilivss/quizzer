const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quizzer API',
      version: '1.0.0',
    },
    servers: [{ url: '/api/v1' }],
  },
  apis: ['./src/**/*.js'], // files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
