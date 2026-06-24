import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
  }

  create(data: {
    email: string;
    passwordHash: string;
    displayName: string;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        profile: {
          create: {
            displayName: data.displayName,
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }
}