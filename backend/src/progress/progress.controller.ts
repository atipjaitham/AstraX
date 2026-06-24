import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('missions/:id/complete')
  @UseGuards(JwtAuthGuard)
  complete(@Request() req: any, @Param('id') missionId: string) {
    return this.progressService.completeMission(req.user.userId, missionId);
  }
}
