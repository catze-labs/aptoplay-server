import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AptoplayService } from "./aptoplay/aptoplay.service";
import { AuthService } from "./auth/auth.service";
import { AptosService } from "./aptos/aptos.service";
import { NftService } from "./nft/nft.service";

@Module({
  providers: [
    PrismaService,
    AptoplayService,
    AuthService,
    AptosService,
    NftService
  ],
  exports: [
    PrismaService,
    AptoplayService,
    AuthService,
    AptosService,
    NftService
  ]
})
export class ServicesModule {}
