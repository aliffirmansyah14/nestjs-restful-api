import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  use(req: Request, res: any, next: () => void) {
    this.logger.debug(`Request url ${req.url}`);
    next();
  }
}
