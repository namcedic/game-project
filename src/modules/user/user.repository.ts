import { AppDataSource } from '@database/data-source';
import { UserEntity } from '@database/entities/user.entity';

export const userRepository = AppDataSource.getRepository(UserEntity);
