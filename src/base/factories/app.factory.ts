import * as express from 'express';
import { RouteDefinition } from '../decorator/common.decorator';

function midleware(req, res, next, app: express.Application) {
  next()
}
export default class ApplicationFactory {
  constructor() { }

  static excute(app: express.Application, ControllerArr: Array<any>) {
    ControllerArr.forEach(controller => {
      const instance = new controller();
      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
      routes.forEach(route => {
        app[route.requestMethod](prefix + route.path,
          [(req, res, next) => midleware(req, res, next, app),],
          (req: express.Request, res: express.Response) => {
            instance[route.methodName](req, res);
          });
      });
    });
  }
}