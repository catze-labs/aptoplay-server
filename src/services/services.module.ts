import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AptoplayService } from "./aptoplay/aptoplay.service";

@Module({
  providers: [PrismaService, AptoplayService],
  exports: [PrismaService, AptoplayService]
})
export class ServicesModule {}
