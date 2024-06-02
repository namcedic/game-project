import { Request, Response } from 'express';
import { UserDTO } from '@modules/auth/dtos/requests/user-dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';

export class UserController {
  constructor(private userService: UserService) {}
  public async signup(req: Request, res: Response) {
    const userDto: UserDTO = plainToInstance(UserDTO, req.body);

    const userResponse = await this.userService.create(userDto);

    return res
      .status(200)
      .json({ message: 'User created successfully', userResponse });
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id, 10);
      const updateUser: UserDTO = plainToInstance(UserDTO, req.body);

      await this.userService.updateUser(idNumber, updateUser);

      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while updating the user',
        error: error?.message,
      });
    }
  }

  public async getProfile(req: any, res: Response) {
    try {
      const { id } = req.currentUser;
      const idNumber = parseInt(id, 10);

      const user = await this.userService.getUser(idNumber);

      return res
        .status(200)
        .json({ message: 'Get user profile successfully', user });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while get the user',
        error: error?.message,
      });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id, 10);

      await this.userService.deleteUser(idNumber);

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while deleting the user',
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
}
