import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AppExceptionFilterCustom implements ExceptionFilter {
    constructor(private httpAdaptorHost : HttpAdapterHost){
        // with the help of this adaptor, we will make plateform agnostic or response independent of 
        // framewrok or plateform like express, fastify etc.
    }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message = "Internal Server error"

        if(exception instanceof HttpException){
            status = exception.getStatus()
            message = exception.message
        }
        const httpAdaptor = this.httpAdaptorHost.httpAdapter
        const responsePayload = {
            message : message,
            status : status,
            timeStamp : new Date().toISOString()
        }
        httpAdaptor.reply(ctx.getResponse(), responsePayload, status)

    }
}