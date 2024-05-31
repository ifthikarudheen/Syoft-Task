import express from 'express';
import helmet from 'helmet';
// import compression from 'compression';
import cors from 'cors';
// import passport from 'passport';
import httpStatus from 'http-status';
// import morgan from './config/morgan';
import xss from './middlewares/xss.js';
import passport from './config/passport.js';
import { authLimiter } from './middlewares/rateLimiter.js';
import routes from './routes/v1/index.js';
import {  errorHandler,errorConverter } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import 'dotenv/config'

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
 app.use(xss());


// enable cors
app.use(cors());
app.options('*', cors());

app.use(passport.initialize());

// limit repeated failed requests to auth endpoints
app.use('/v1/auth', authLimiter);


// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
 app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
