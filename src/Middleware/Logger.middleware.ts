import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const formattedRequest = {
        header: req.headers,
        method: req.method,
        body: req.body,
        url: req.url,
      }
      req["ua"] = req.headers['user-agent'] // add new key, value to request object
      console.log('Request Log:', formattedRequest);
    next();
  }
}

export const FunctionalLogger = (req : Request, res : Response, next : NextFunction) => {
    const formattedRequest = {
        header: req.headers,
        method: req.method,
        body: req.body,
        url: req.url,
      };
      console.log('Request Log:', formattedRequest);
    next();
}
