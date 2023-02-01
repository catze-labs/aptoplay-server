import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AptoplayService } from "./aptoplay/aptoplay.service";
import { ScheduleService } from "./schedule/schedule.service";
import { AuthService } from "./auth/auth.service";

@Module({
  providers: [PrismaService, AptoplayService, ScheduleService, AuthService],
  exports: [PrismaService, AptoplayService, AuthService]
})
export class ServicesModule {}
