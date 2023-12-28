import { Injectable } from "@nestjs/common";
import * as winston from "winston"

const loggerTransport = new winston.transports.Console()
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  

@Injectable()
export class MyLoggerService {
    private logger  =  winston.createLogger(
        {
            format: combine
            (
                label({ label: 'Yield-Backend-Logger Says!' }),
                timestamp(),
                myFormat
            ),
            transports : [loggerTransport]
        }
    )
    constructor(){}

    log(message : string){
        this.logger.info(message)
    }

    error(message : string){
        this.logger.error(message)
    }

    warn(message : string){
        this.logger.warn(message)
    }
}