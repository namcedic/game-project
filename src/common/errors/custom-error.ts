import { HttpStatusCode } from '@common/constants/http-status-code-enum';

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class NotFoundException extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class ConflictException extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.CONFLICT);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}

export class BadRequestException extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
