import 'reflect-metadata'

import * as express from 'express'
import { json } from 'body-parser'

import AppController from './src/modules/AppController'
import DemoController from './src/modules/Demo/DemoController'
import { CronJobService } from './src/modules/CronJob/CronJob'

const port = 8888
const app = express()

app.use(json());

const cronJob = new CronJobService().start();

// app.use('/', new AppController().routes())
app.use('/home', new DemoController().routes())
app.use('/product', new DemoController().routes())

app.listen(port, () => console.log(`App listening port ${port}`))