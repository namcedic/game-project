import { UserDTO } from '@modules/auth/dtos/requests/user-dto';
// import { hashPassword } from '@common/utils/password';
import { plainToInstance } from 'class-transformer';
import { userRepository } from '@modules/user/user.repository';
import { Not } from 'typeorm';
import { UserResponse } from '@modules/auth/dtos/responses/user-response';

export class UserService {
  constructor() {}

  // public index = async () => {
  //   const users = await authRepository.find()
  //   return users;
  // }

  public create = async (user: UserDTO) => {
    // const encryptedPassword = await hashPassword(user.password);
    const userResponse = await userRepository.save(user);
    // const userResponse =  await authRepository.save({ ...user, password: encryptedPassword });
    return plainToInstance(UserDTO, userResponse);
  };

  public updateUser = async (id: number, user: UserDTO) => {
    const existingUser = await userRepository.findOne({
      where: { id },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    const duplicateUserEmail = await userRepository.findOne({
      where: { id: Not(id), email: user.email },
    });
    if (duplicateUserEmail) {
      throw new Error('User with this email already exists');
    }

    const duplicateUserName = await userRepository.findOne({
      where: { id: Not(id), userName: user.userName },
    });
    if (duplicateUserName) {
      throw new Error('User with this userName already exists');
    }

    return await userRepository.update(id, user);
  };

  public getUser = async (id: number) => {
    const existingUser = await userRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['games'],
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    return plainToInstance(UserResponse, existingUser);
  };

  public deleteUser = async (id: number) => {
    const existingUser = await userRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!existingUser) {
      throw new Error('User not found');
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
