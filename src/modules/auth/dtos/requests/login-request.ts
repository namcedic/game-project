import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
