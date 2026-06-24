import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser =
      await this.usersService.findByEmail(
        dto.email,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      10,
    );

    const user =
      await this.usersService.create({
        email: dto.email,
        passwordHash,
        displayName: dto.displayName,
      });

    const accessToken =
      await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName:
          user.profile?.displayName,
      },
    };
  }
    async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(
        email,
    );

    if (!user) {
        throw new BadRequestException(
        'Invalid email or password',
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash,
    );

    if (!isPasswordValid) {
        throw new BadRequestException(
        'Invalid email or password',
        );
    }

    const accessToken =
        await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        });

    return {
        accessToken,
        user: {
        id: user.id,
        email: user.email,
        displayName:
            user.profile?.displayName,
        },
    };
    }
}