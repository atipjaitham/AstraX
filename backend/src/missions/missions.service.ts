import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MissionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.mission.findMany({
      include: {
        planet: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findTodayMission() {
    return this.prisma.mission.findFirst({
      include: {
        planet: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
