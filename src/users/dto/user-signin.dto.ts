import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty({ message: 'Email can not be empty!' })
  @IsEmail({}, { message: 'Please provide a valid email!' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty!' })
  password: string;
}
