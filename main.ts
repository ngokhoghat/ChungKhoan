import 'reflect-metadata'

import * as express from 'express'
import { json } from 'body-parser'

import AppController from './src/modules/AppController'
import DemoController from './src/modules/Demo/DemoController'
import { CronJobService } from './src/service/CronJobService'
import { PuppeteerService } from './src/service/PuppeteerService'

const port = 8888;
const app = express();

app.use(json());

app.set('views', __dirname + '/src/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


app.use('/home', new DemoController().routes());
app.use('/product', new DemoController().routes());

app.listen(port, () => console.log(`App listening port ${port}`))