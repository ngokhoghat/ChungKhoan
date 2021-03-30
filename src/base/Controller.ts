import * as express from 'express'

const routes = express.Router()

export default abstract class Controller {
  router: express.Router;

  constructor() {
    this.router = routes;
  }

  routes() {
    return this.router;
  }
}

export function Get(path?) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const value = target[propertyKey]();

    routes.get(path, (req, res) => {
      res.send(value)
    })
  };
}