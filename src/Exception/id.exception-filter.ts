import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { IdException } from "./id.exception";

export class IdExceptionFilter implements ExceptionFilter {
    catch(exception: IdException, host: ArgumentsHost) {
        const body = {
            message : exception.message,
            error : "Id Error",
            name : exception.name,
            code : 400,
            uiMessage : "Please enter valid user id."
        }
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        response.status(HttpStatus.BAD_REQUEST).json(body)
    }
}