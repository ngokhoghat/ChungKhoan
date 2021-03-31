import 'reflect-metadata';

import * as express from 'express';
import * as session from 'express-session'
import { config } from 'dotenv';
import { json } from 'body-parser'

import ApplicationFactory from './src/base/factories/app.factory';
import DBConnection from './src/data/providers/DbConnection';

import CartController from './src/modules/cart/CartController'
import UserController from './src/modules/user/UserController'
import ProductController from './src/modules/product/Product.controller'
import CrawlerController from './src/modules/crawler/CrawlerController'
import CronJobController from './src/modules/cronJob/CronJob.controller'

const app = express();
const port = 8888;

app.use(json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'somesecret',
  // cookie: { maxAge: 60000 }
}));

config()

app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

DBConnection.connect();

app.get('/', (req: express.Request, res: express.Response) => {
  console.log((req.session as any).views);

  return res.render('index')
});

app.get('/set_session', (req: express.Request, res: express.Response) => {
  (req.session as any).User = {
    website: 'anonystick.com',
    type: 'blog javascript',
    like: '4550'
  }

  return res.status(200).json({ status: 'success' })
});

app.get('/get_session', (req, res) => {
  //check session
  if ((req.session as any).User) {
    return res.status(200).json({ status: 'success', session: (req.session as any).User })
  }
  return res.status(200).json({ status: 'error', session: 'No session' })
})

//destroy session
app.get('/destroy_session', (req, res) => {
  //destroy session
  req.session.destroy(function (err) {
    return res.status(200).json({ status: 'success', session: 'cannot access session here' })
  })
})


ApplicationFactory.excute(app, [
  UserController,
  CartController,
  ProductController,
  CrawlerController,
  CronJobController
])

app.listen(port, () => console.log(`Started express on port ${port}`));