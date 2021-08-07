import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function BodyProps(...props: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.Body, props, target, key);
  };
}
