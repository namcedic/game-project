import { UserDto } from '@modules/auth/dtos/requests/user-dto';
import { plainToInstance } from 'class-transformer';
import { userRepository } from '@modules/user/user.repository';
import { Not } from 'typeorm';
import { GetUsersRequest } from '@modules/user/dtos/requests/get-users-request';
import { UserResponse } from '@modules/user/dtos/responses/user-response';
import {
  ConflictException,
  NotFoundException,
} from '@common/errors/custom-error';

export class UserService {
  constructor() {}

  public updateUser = async (id: number, user: UserDto) => {
    const existingUser = await userRepository.findOne({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const duplicateUserEmail = await userRepository.findOne({
      where: { id: Not(id), email: user.email },
    });
    if (duplicateUserEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const duplicateUserName = await userRepository.findOne({
      where: { id: Not(id), userName: user.userName },
    });
    if (duplicateUserName) {
      throw new ConflictException('User with this userName already exists');
    }

    return await userRepository.update(id, user);
  };

  public getUsers = async (getUsersReq: GetUsersRequest) => {
    const page = getUsersReq.page || 1;
    const limit = getUsersReq.limit || 20;
    const skip = (page - 1) * limit;
    const [users, total] = await userRepository.findAndCount({
      where: { isDeleted: false },
      relations: ['games'],
      skip,
      take: limit,
    });

    const usersResponse = plainToInstance(UserResponse, users);

    return {
      data: usersResponse,
      total,
    };
  };

  public getUser = async (id: number) => {
    const existingUser = await userRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['games'],
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponse, existingUser);
  };

  public deleteUser = async (id: number) => {
    const existingUser = await userRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return await userRepository.update(
      {
        id,
      },
      {
        isDeleted: true,
      }
    );
  };
}
