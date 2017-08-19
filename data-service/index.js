'use strict';
const express = require('express');
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebirdPromise from 'bluebird';
import routes from './routes/route';
const Mongoose = bluebirdPromise.promisifyAll(mongoose);
const app = express();
  mongoose.connect('mongodb://127.0.0.1/facetrace');
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept,' +
      'Cache-Control, atlas-token, Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
    next();
  });
  console.log('start')
  app.listen(8989, () => {});

  app.use(bodyParser.json({
    limit: "500mb",
    verify: (req, res, body) => {
      req.rawBody = body.toString() !== '' ? body.toString() : '{}';
    }
  }));

  app.get('/', (req, res) => {
    res.json('face trace service is up now');
  });

  app.use('/v1', routes);

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.body) {
      const errorData = err ? err.body || err : {};
      return res.status(400).json(errorData);
    }
    if (err) {
      return res.status(500).json(err);
    }
    next();
  });

  console.log('face trace upload  running on port', 8989);



