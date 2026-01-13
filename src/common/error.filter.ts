import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { error } from 'node:console';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFiler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      const isFormErrors = exception.flatten().formErrors.length > 0;
      const errors = isFormErrors
        ? exception.flatten().formErrors
        : exception.flatten().fieldErrors;
      response.status(400).json({
        messages: 'Validation request error',
        errors,
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
