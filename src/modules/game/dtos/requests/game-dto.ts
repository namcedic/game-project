import { Expose } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '@database/entities/user.entity';

export class GameDto {
  @IsOptional()
  @IsString()
  @Expose()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  genre: string;

  @IsISO8601()
  @Expose()
  releaseDate: Date;

  @Expose()
  owner: UserEntity;
}
