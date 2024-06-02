import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@common/errors/custom-error';
import { HttpStatusCode } from '@common/constants/http-status-code-enum';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
  }
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(`Error: ${error.message}`);
  return res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};
