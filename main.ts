import 'reflect-metadata';

import * as express from 'express';
import * as session from 'express-session'
import { config } from 'dotenv';
import { json } from 'body-parser'
import * as exphbs from 'express-handlebars'

import ApplicationFactory from './src/base/factories/app.factory';
import DBConnection from './src/data/providers/DbConnection';

import HomePageController from './src/modules/homepage/HomePageController'
import ShopPageController from './src/modules/shop/ShopPageController'

import CartController from './src/modules/cart/CartController'
import UserController from './src/modules/user/UserController'
import ProductController from './src/modules/product/Product.controller'
import CrawlerController from './src/modules/crawler/CrawlerController'
import CronJobController from './src/modules/cronJob/CronJob.controller'

const app = express();
const port = 8888;

app.use(express.static(__dirname + '/public'));

app.use(json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'somesecret',
  // cookie: { maxAge: 60000 }
}));

config()

app.engine('hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/src/views/layouts/'
  }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');

DBConnection.connect();

ApplicationFactory.excute(app, [
  HomePageController,
  ShopPageController,

  UserController,
  CartController,
  ProductController,
  CrawlerController,
  CronJobController,
])

app.listen(port, () => console.log(`Started express on port ${port}`));
