import {
  IMiddlewareError,
  MiddlewareError,
  Response,
  Next,
  Err,
  Session,
} from '@tsed/common';
import * as Sentry from '@sentry/node';
const pkg = require('../../../../package.json');

require('dotenv').config();

@MiddlewareError()
export class ErrorHandler implements IMiddlewareError {
  use(@Err() err, @Session() session: ISession, @Response() res, @Next() next) {
    if (res.headersSent) {
      return next(err);
    }

    if (process.env.APP_ENV !== 'development') {
      Sentry.init({
        dsn: '...',
        release: `...@${pkg.version}`,
        environment: process.env.APP_ENV,
      });
      Sentry.configureScope((scope) => {
        scope.setTag('version', pkg.version);
      });
    }

    switch (err.name) {
      case 'SequelizeValidationError':
        let errors = err.errors.map((error) => error.message);
        if (errors.length === 0) {
          errors = [err.message];
        }
        res.status(400).send(errors);
        return next();

      case 'SequelizeDatabaseError':
        Sentry.captureException(err);
        res.status(500).send(err.parent.sqlMessage);
        return next();

      default:
        console.log(err);
        Sentry.captureException(err);
        res.send(400);
        return next();
    }
  }
}
