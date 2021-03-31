import 'reflect-metadata';

import * as express from 'express';
import { config } from 'dotenv';
import { json } from 'body-parser'

import ApplicationFactory from './src/base/factories/app.factory';
import DBConnection from './src/data/providers/DbConnection';

import CartController from './src/modules/cart/CartController'
import UserController from './src/modules/user/UserController'
import ProductController from './src/modules/product/Product.controller'

const app = express();
const port = 3000;

app.use(json());
config()

app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

DBConnection.connect();

app.get('/', (req: express.Request, res: express.Response) => res.render('index'));


ApplicationFactory.excute(app, [
  UserController,
  ProductController,
  CartController
])

app.listen(port, () => console.log(`Started express on port ${port}`));