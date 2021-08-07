import "reflect-metadata";
import { RequestHandler } from "express";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

interface RouteHandlerDescriptor {
  value?: RequestHandler;
}

function RouteBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

export const Get = RouteBinder(Methods.Get);
export const Post = RouteBinder(Methods.Post);
export const Put = RouteBinder(Methods.Put);
export const Patch = RouteBinder(Methods.Patch);
export const Delete = RouteBinder(Methods.Delete);
