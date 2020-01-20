import * as path from 'path';
import { ServerSettings, ServerLoader } from '@tsed/common';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as expressSequelizeSession from 'express-sequelize-session';
import * as expressHandlebars from 'express-handlebars';
import { memoryStorage } from 'multer';
import '@tsed/swagger';
import connection from './database/connection';
import { ErrorHandler } from './middleware/v1/ErrorHandler';

const rootDir = path.resolve(__dirname);

require('dotenv').config();

// Init session
const Store = expressSequelizeSession(expressSession.Store);

// Init handlebars
const handlebars = expressHandlebars.create({
  defaultLayout: 'main',
  extname: '.hbs',
});

// Init server
@ServerSettings({
  rootDir,
  port: process.env.API_PORT,
  acceptMimes: ['application/json'],
  mount: {
    '/api/v1': `${rootDir}/controllers/v1/**/*.ts`,
  },
  componentsScan: [`${rootDir}/middleware/**/*.ts`],
  swagger:
    process.env.NODE_ENV === 'development' ? [{ path: '/docs' }] : undefined,
  multer: {
    storage: memoryStorage(),
  },
})
class Server extends ServerLoader {
  public $onMountingMiddlewares() {
    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json({ limit: '15MB', type: 'application/json' }));
    this.use(
      expressSession({
        store: new Store(connection),
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET,
      }),
    );
    this.engine('.hbs', handlebars.engine);
    this.set('view engine', '.hbs');
    this.set('views', './src/api/views');
  }

  public $onReady() {
    console.log(`API online @ ${process.env.API_PORT}`);
  }

  public $onServerInitError(err) {
    console.error(err);
  }

  public $afterRoutesInit() {
    this.use(ErrorHandler);
  }
}

// Start server
new Server().start();
