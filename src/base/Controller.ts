import * as express from 'express'

const routes = express.Router()
const reqObj = {}
export default abstract class Controller {
  router: express.Router;

  constructor() {
    this.router = routes;
  }

  routes() {
    return this.router;
  }
}

export function Get(path = '/') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    routes.get(path, async (req, res) => {
      try {
        const value = await target[propertyKey](req.params);
        res.send(value)
      } catch (error) {
        res.sendStatus(500);
      }
    })
  };
}

export function Post(path = '/') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    routes.post(path, (req, res) => {
      try {
        const value = target[propertyKey](req.body);
        res.send(value)
      } catch (error) {
        res.sendStatus(500);
      }
    })
  };
}
