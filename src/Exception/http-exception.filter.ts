import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ExecutionContext } from "./ExecutionContext";
import { join } from "path";
import { writeFile, writeFileSync } from "fs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ExecutionContext) {
        const [req, res, next] = host.getArgs()
        const response = res
        const request : Request = req
        const status = response.statusCode
        const method = host.getHandler()
        const className = host.getClass()
        const body = {
            statusCode : status,
            timestamp : new Date().toISOString(),
            path : request.url,
            method : method,
            className : className,
            message : exception.message
        }
        this.writeLogToFile(body)
        response
        .status(status)
        .json(body)
    }

    private async writeLogToFile(data : Record<string, any>){
        // written can be found out in dist/src/exceptions folder
        const LOGS_DIR = join(__dirname, `${Date.now()}-http-log.json`)
        try {
            writeFileSync(LOGS_DIR, JSON.stringify(data))
        } catch(err){
            console.log("err : ")
            return
        }
    }
}