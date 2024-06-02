import { Request, Response } from 'express';
import { UserDTO } from '@modules/auth/dtos/requests/user-dto';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '@modules/auth/auth.service';
import { validate } from 'class-validator';
import { LoginRequest } from '@modules/auth/dtos/requests/login-request';

export class AuthController {
  constructor(private authService: AuthService) {}
  public async signup(req: Request, res: Response) {
    try {
      const userDto: UserDTO = plainToInstance(UserDTO, req.body);
      const errors = await validate(userDto);
      if (errors?.length) {
        return res.status(400).json({ message: errors.values(), errors });
      }
      const userResponse = await this.authService.create(userDto);

      return res
        .status(200)
        .json({ message: 'User created successfully', userResponse });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while creating the user',
        error: error?.message,
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const loginRequest: LoginRequest = plainToInstance(
        LoginRequest,
        req.body
      );
      const errors = await validate(loginRequest);
      if (errors.length > 0) {
        return res.status(400).json({ message: errors.values(), errors });
      }
      const token = await this.authService.login(loginRequest);

      return res.status(200).json({ message: 'Login successfully', token });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while creating the user',
        error: error?.message,
      });
    }
  }
  // static async getUsers(req: Request, res: Response) {
  //   const data = cache.get("data");
  //   if (data) {
  //     console.log("serving from cache");
  //     return res.status(200).json({
  //       data,
  //     });
  //   } else {
  //     console.log("serving from db");
  //     const authRepository = AppDataSource.getRepository(UserEntity);
  //     const users = await authRepository.find();
  //
  //     cache.put("data", users, 6000);
  //     return res.status(200).json({
  //       data: users,
  //     });
  //   }
  // }
  // static async updateUser(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { name, email } = req.body;
  //   const authRepository = AppDataSource.getRepository(UserEntity);
  //   const user = await authRepository.findOne({
  //     where: { id },
  //   });
  //   user.name = name;
  //   user.email = email;
  //   await authRepository.save(user);
  //   res.status(200).json({ message: "udpdate", user });
  // }
  //
  // static async deleteUser(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const authRepository = AppDataSource.getRepository(UserEntity);
  //   const user = await authRepository.findOne({
  //     where: { id },
  //   });
  //   await authRepository.remove(user);
  //   res.status(200).json({ message: "ok" });
  // }
}
