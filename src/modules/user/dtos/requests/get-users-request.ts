import { IsNumber } from 'class-validator';

export class GetUsersRequest {
  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}
