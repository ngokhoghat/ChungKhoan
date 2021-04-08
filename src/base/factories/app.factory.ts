import * as express from 'express';
import { RouteDefinition } from '../decorator/common.decorator';

function defaultMidleWare(req, res, next) {
  next()
}
export default class ApplicationFactory {
  constructor() { }

  static excute(app: express.Application, ControllerArr: Array<any>) {
    ControllerArr.forEach(controller => {
      const instance = new controller();
      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
      const midellewares: any = Reflect.getMetadata('middleware', controller) || [defaultMidleWare];

      routes.forEach(route => {
        app[route.requestMethod](prefix + route.path,
          midellewares,
          (req: express.Request, res: express.Response) => {
            instance[route.methodName](req, res);
          });
      });
    });
  }
}