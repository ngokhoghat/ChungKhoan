
import 'reflect-metadata'

export const UseAuthen = (conditionFunction): ClassDecorator => {
  return (target: any) => {
    if (!Reflect.hasMetadata('middleware', target)) {
      Reflect.defineMetadata('middleware', [], target);
    }

    const midellewares = Reflect.getMetadata('middleware', target) as Array<any>;

    midellewares.push(conditionFunction);

    Reflect.defineMetadata('middleware', midellewares, target);
  };
};