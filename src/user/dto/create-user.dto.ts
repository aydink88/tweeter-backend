import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly handle: string;

  @IsNotEmpty()
  readonly email: string;

  @MinLength(6, { message: 'password should be at least 6 characters' })
  @IsNotEmpty()
  readonly password: string;
}
