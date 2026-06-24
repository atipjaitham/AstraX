import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async completeMission(userId: string, missionId: string) {
    const existing = await this.prisma.userMission.findUnique({
      where: {
        userId_missionId: {
          userId,
          missionId,
        },
      },
    });

    if (existing?.completed) {
      throw new BadRequestException('Mission already completed');
    }

    const mission = await this.prisma.mission.findUnique({
      where: {
        id: missionId,
      },
    });

    if (!mission) {
      throw new BadRequestException('Mission not found');
    }

    await this.prisma.userMission.upsert({
      where: {
        userId_missionId: {
          userId,
          missionId,
        },
      },
      create: {
        userId,
        missionId,
        completed: true,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
    });

    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    const newXp = profile.xp + mission.xpReward;

    const newLevel = Math.floor(newXp / 100) + 1;

    await this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        xp: newXp,
        level: newLevel,
      },
    });

    return {
      success: true,
      xp: newXp,
      level: newLevel,
      reward: mission.xpReward,
    };
  }
}
