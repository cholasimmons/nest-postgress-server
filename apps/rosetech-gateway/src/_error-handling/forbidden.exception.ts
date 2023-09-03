import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN, {cause: new Error('You were forbidden by a custom handler'), description: 'You\'ve been forbidden by a custom handler'});
    }
  }
  