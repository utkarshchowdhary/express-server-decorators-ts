import "reflect-metadata";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Router } from "../../Router";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

function validateBodyProps(props: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    for (let prop of props) {
      if (!req.body[prop]) {
        res.status(422).send(`Missing Property ${prop}`);
        return;
      }
    }

    next();
  };
}

export function Controller(routePrefix: string) {
  return function (target: Function) {
    const router = Router.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
        [];

      const bodyProps =
        Reflect.getMetadata(MetadataKeys.Body, target.prototype, key) || [];

      const validator = validateBodyProps(bodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
