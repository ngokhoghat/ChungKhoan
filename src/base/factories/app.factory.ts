import * as express from 'express';
import { RouteDefinition } from '../decorator/common.decorator';

export default class ApplicationFactory {
  constructor() { }

  static excute(app: express.Application, ControllerArr: Array<any>) {
    ControllerArr.forEach(controller => {
      const instance = new controller();
      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
      routes.forEach(route => {
        app[route.requestMethod](prefix + route.path,
          (req: express.Request, res: express.Response) => {
            instance[route.methodName](req, res);
          });
      });
    });
  }
}