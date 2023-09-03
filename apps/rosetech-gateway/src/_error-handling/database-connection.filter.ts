import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { QueryFailedError } from 'typeorm';
  
  @Catch(QueryFailedError)
  export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      // Customize the error message based on your requirements
      const errorMessage = 'Database connection error occurred. Please try again later.';
  
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: errorMessage +': '+exception,
      });
    }
  }