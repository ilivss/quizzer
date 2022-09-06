/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { questionsRouter } = require('./domain/question/question.controller');
const { categoryRouter } = require('./domain/category/category.controller');

/** EXPRESS */
const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
if (process.env.ENVIRONMENT === 'dev') {
  app.use((req, res, next) => {
    console.log('[REST]', req.url);
    next();
  });
}

// Routes
app.use('/api/v1', categoryRouter);
app.use('/api/v1', questionsRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.toString());
  if (process.env.ENVIRONMENT === 'dev') return res.status(500).send(err.toString());

  return res.status(500).send('Whoops! Something went wrong!');
});

// Swagger
if (process.env.ENVIRONMENT === 'dev') {
  // eslint-disable-next-line global-require
  require('./utils/swagger')(app);
}

/** START SERVER */
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(`Error connecting to database: ${err}`);
      console.log('Shutting down server...');
      return app.close();
    }

    console.log('Database connection established');

    return 0;
  });
});
