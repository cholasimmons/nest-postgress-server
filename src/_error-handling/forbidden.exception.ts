import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN, {cause: new Error(), description: 'You\'ve been forbidden by a custom handler'});
    }
  }
  