import { ArgumentsHost, Type } from "@nestjs/common";

export interface ExecutionContext extends ArgumentsHost {
    /**
     * Returns the type of the controller class which the current handler belongs to.
     */
    getClass<T>(): Type<T>;
    /**
     * Returns a reference to the handler (method) that will be invoked next in the
     * request pipeline.
     */
    getHandler(): Function;
  }