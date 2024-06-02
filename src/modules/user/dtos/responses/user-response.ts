import { Exclude, Expose } from 'class-transformer';
import { RoleEnum } from '@common/constants/role-enum';
import { GameEntity } from '@database/entities/game.entity';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';

export class UserResponse {
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
  @Min(8)
  @Exclude()
  password: string;

  @Expose()
  isActive: boolean;

  @IsEnum(RoleEnum)
  @Expose()
  role: RoleEnum;

  @Expose()
  games: GameEntity[];
}
