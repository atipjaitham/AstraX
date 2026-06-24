import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  displayName: string;

  @IsString()
  @MinLength(8)
  @Matches(/\d/, {
    message: 'Password must contain at least one number',
  })
  password: string;
}