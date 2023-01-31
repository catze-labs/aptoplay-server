import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AptoplayService } from "./aptoplay/aptoplay.service";
import { ScheduleService } from './schedule/schedule.service';

@Module({
  providers: [PrismaService, AptoplayService, ScheduleService],
  exports: [PrismaService, AptoplayService]
})
export class ServicesModule {}
