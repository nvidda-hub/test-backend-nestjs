import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface Response<T> {
    data : T
}

export class TransformResponse<T> implements NestInterceptor<T, Response<T>> {
 intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
     return next.handle().pipe(map(data => ({data})))
 }
}