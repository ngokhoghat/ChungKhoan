import 'reflect-metadata'

export interface RouteDefinition {
  path: string;
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  methodName: string;
}

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};

export const Get = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    routes.push({
      requestMethod: 'get',
      path,
      methodName: propertyKey
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export const Post = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    routes.push({
      requestMethod: 'post',
      path,
      methodName: propertyKey
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export const UseMidlleware = (func: Function): ClassDecorator => {
  return (target: any) => {
    if (!Reflect.hasMetadata('middleware', target)) {
      Reflect.defineMetadata('middleware', [], target);
    }

    const midellewares = Reflect.getMetadata('middleware', target) as Array<any>;

    midellewares.unshift(func);

    Reflect.defineMetadata('middleware', midellewares, target);
  };
};

export const UseGlobal = (func: Function): ClassDecorator => {
  return (target: any) => {
    if (!Reflect.hasMetadata('global', target)) {
      Reflect.defineMetadata('global', [], target);
    }

    const global = Reflect.getMetadata('global', target) as Array<any>;

    global.unshift(func);

    Reflect.defineMetadata('global', global, target);
  };
};