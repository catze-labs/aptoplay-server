import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AptoplayService } from "./aptoplay/aptoplay.service";
import { ScheduleService } from "./schedule/schedule.service";
import { AuthService } from "./auth/auth.service";
import { TransactionService } from "./transaction/transaction.service";

@Module({
  providers: [
    PrismaService,
    AptoplayService,
    ScheduleService,
    AuthService,
    TransactionService
  ],
  exports: [PrismaService, AptoplayService, AuthService, TransactionService]
})
export class ServicesModule {}
