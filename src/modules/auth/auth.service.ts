import { UserDto } from '@modules/auth/dtos/requests/user-dto';
import { plainToInstance } from 'class-transformer';
import { userRepository } from '@modules/user/user.repository';
import {
  comparePassword,
  generateToken,
  hashPassword,
} from '@common/utils/password';
import { LoginRequest } from '@modules/auth/dtos/requests/login-request';
import { UserResponse } from '@modules/user/dtos/responses/user-response';

export class AuthService {
  constructor() {}

  public create = async (user: UserDto) => {
    const duplicateUserEmail = await userRepository.findOne({
      where: { email: user.email },
    });
    if (duplicateUserEmail) {
      throw new Error('User with this email already exists');
    }

    const duplicateUserName = await userRepository.findOne({
      where: { userName: user.userName },
    });
    if (duplicateUserName) {
      throw new Error('User with this userName already exists');
    }

    const encryptedPassword = await hashPassword(user.password);
    const userResponse = await userRepository.save({
      ...user,
      password: encryptedPassword,
    });

    return plainToInstance(UserResponse, userResponse);
  };

  public login = async (request: LoginRequest) => {
    const existingUser = await userRepository.findOne({
      where: { userName: request.userName },
    });

    if (!existingUser) {
      throw new Error('UserName or password is incorrect');
    }
    const isPasswordCorrect = await comparePassword(
      request.password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw new Error('UserName or password is incorrect');
    }

    return generateToken({
      id: existingUser.id.toString(),
      role: existingUser.role,
    });
  };

  // public update =  async(user: GetGamesRequest, id: number) => {
  //   const updatedUser = await authRepository.update(id, user);
  //   return updatedUser;
  // }
  //
  // public delete = async (id: number) => {
  //   const deletedUser = await this.authRepository.delete(id);
  //   return deletedUser;
  // }
}
