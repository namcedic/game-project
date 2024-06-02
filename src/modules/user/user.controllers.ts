import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@modules/auth/dtos/requests/user-dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';
import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@common/errors/custom-error';
import { RequestWithCurrentUser } from '@common/constants/request-with-current-user';

export class UserController {
  constructor(private userService: UserService) {}
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const updateUser: UserDto = plainToInstance(UserDto, req.body);

      const validateErrors = await validate(updateUser);
      if (validateErrors?.length) {
        const errorMessages: string[] = [];
        validateErrors.forEach((error: ValidationError) => {
          if (error.constraints) {
            const errors = Object.values(error.constraints);
            errorMessages.push(errors.join('; '));
          }
        });
        throw new BadRequestException(errorMessages.join('; '));
      }
      await this.userService.updateUser(idNumber, updateUser);

      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query;
      const users = await this.userService.getUsers({
        limit: Number(limit),
        page: Number(page),
      });

      return res.status(200).json({ message: 'Get users successfully', users });
    } catch (error) {
      next(error);
    }
  }

  public async getProfile(
    req: RequestWithCurrentUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const currentUser = req.currentUser;
      const idNumber = Number(currentUser?.id);

      const user = await this.userService.getUser(idNumber);

      return res
        .status(200)
        .json({ message: 'Get user profile successfully', user });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      await this.userService.deleteUser(idNumber);

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
