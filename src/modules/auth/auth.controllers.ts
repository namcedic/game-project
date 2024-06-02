import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@modules/auth/dtos/requests/user-dto';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '@modules/auth/auth.service';
import { validate, ValidationError } from 'class-validator';
import { LoginRequest } from '@modules/auth/dtos/requests/login-request';
import { BadRequestException } from '@common/errors/custom-error';

export class AuthController {
  constructor(private authService: AuthService) {}
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: UserDto = plainToInstance(UserDto, req.body);
      const validateErrors = await validate(UserDto);
      if (validateErrors?.length) {
        this.handlerErrors(validateErrors);
      }
      const userResponse = await this.authService.create(userDto);

      return res
        .status(200)
        .json({ message: 'User created successfully', userResponse });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginRequest: LoginRequest = plainToInstance(
        LoginRequest,
        req.body
      );
      const validateErrors = await validate(loginRequest);
      if (validateErrors.length > 0) {
        this.handlerErrors(validateErrors);
      }
      const token = await this.authService.login(loginRequest);

      return res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
      next(error);
    }
  }

  private handlerErrors(validateErrors: ValidationError[]) {
    const errorMessages: string[] = [];
    validateErrors.forEach((error: ValidationError) => {
      if (error.constraints) {
        const errors = Object.values(error.constraints);
        errorMessages.push(errors.join('; '));
      }
    });
    throw new BadRequestException(errorMessages.join('; '));
  }
}
