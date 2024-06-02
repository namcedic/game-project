import { Expose } from 'class-transformer';
import { UserEntity } from '@database/entities/user.entity';

export class GameResponse {
  @Expose()
  title: string;

  @Expose()
  genre: string;

  @Expose()
  releaseDate: string;

  @Expose()
  owner: UserEntity;
}
