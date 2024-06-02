import { Expose } from 'class-transformer';
import { RoleEnum } from '@common/constants/role-enum';
import { GameEntity } from '@database/entities/game.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  userName: string;

  @IsNotEmpty()
  @MinLength(8)
  @Expose()
  password: string;

  @Expose()
  isActive: boolean;

  @IsEnum(RoleEnum)
  @Expose()
  role: RoleEnum;

  @Expose()
  games: GameEntity[];
}
