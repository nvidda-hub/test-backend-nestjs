import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map, of } from "rxjs";

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
 intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const formattedRequest = {
        header: request.headers,
        method: request.method,
        formData: request.formData,
        body: request.body,
        url: request.url,
        text: request.text,
      };
      console.log('Request Log:', formattedRequest);

      return next.handle();
     
 }   
}

export interface ResponseInterface<T> {
  data : T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse()

    return next.handle().pipe(map(data => ({
      status: response.statusCode,
      data : data
    })))
  }
}

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(value => value === null ? '' : value ));
  }
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = false;
    if (isCached) {
      return of([{
        "age": 27,
        "name": "Cat 1",
        "breed":'x',
        "new" : 'y',
        "category":"Cat",
        "food":"Mouse"
    },
    {
      "age": 12,
      "name": "Cat 2",
      "breed":'o',
      "new" : 'p',
      "category":"Cat",
      "food":"Mouse"
  }]);
    }
    return next.handle();
  }
}