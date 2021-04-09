import * as express from 'express';
import { RouteDefinition } from '../decorator/common.decorator';

function defaultMidleWare(req, res, next) {
  next()
}

function defaultGlobal(req, res, next) {
  next()
}
export default class ApplicationFactory {
  constructor() { }

  static excute(app: express.Application, ControllerArr: Array<any>) {
    ControllerArr.forEach(async controller => {
      const instance = new controller();
      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
      const midellewares: any = Reflect.getMetadata('middleware', controller) || [defaultMidleWare];

      const globalApp: Array<any> = await Reflect.getMetadata('global', controller) || [defaultGlobal];

      await app.use(globalApp)


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