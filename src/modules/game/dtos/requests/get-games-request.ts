import { IsNumber } from 'class-validator';

export class GetGamesRequest {
  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}
