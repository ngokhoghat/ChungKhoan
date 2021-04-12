import 'reflect-metadata';

import * as moment from 'moment'
import { config } from 'dotenv';
import * as express from 'express';
import * as session from 'express-session'
import * as upload from 'express-fileupload'
import * as cookieParser from 'cookie-parser'
import { json, urlencoded } from 'body-parser'
import * as exphbs from 'express-handlebars'

import ApplicationFactory from './src/base/factories/app.factory'
import DBConnection from './src/data/providers/DbConnection'
import { expressSessionConfig } from './src/shared/config'
// admin side
import AdminController from './src/modules/_admin/Admin.controller'
import AdminAuthController from './src/modules/_admin/auth/Auth.controller'
import AdminProductController from './src/modules/_admin/product/Product.controller'
import AdminAccountController from './src/modules/_admin/account/Account.controller'
import AdminOrderController from './src/modules/_admin/order/Order.controller'
import AdminCategoryController from './src/modules/_admin/category/Category.controller'

// client site
import ClientController from './src/modules/_client/Client.controller'
import CartController from './src/modules/_client/cart/CartController'
import ProductClientController from './src/modules/_client/product/Product.controller'

import CrawlerController from './src/modules/crawler/CrawlerController'
import CronJobController from './src/modules/cronJob/CronJob.controller'

config()
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(json());
app.use(upload());
app.use(urlencoded({ extended: true }));
app.use(session(expressSessionConfig));
app.use(cookieParser())

app.engine('hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'main.layout.hbs',
    layoutsDir: __dirname + '/src/views/layouts/',
    helpers: {
      prettifyDate: function (timestamp: Date) { return moment(timestamp).format('DD-MM-YYYY hh:ss').toString() }
    }
  }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');

DBConnection.connect();

ApplicationFactory.excute(app, [
  // admin controller
  AdminController,
  AdminAuthController,
  AdminAccountController,
  AdminProductController,
  AdminOrderController,
  AdminCategoryController,

  // client controller
  ClientController,
  CartController,
  ProductClientController,

  // api controller
  CrawlerController,
  CronJobController,
])

app.listen(port, () => console.log(`Started express on port ${port}`));
