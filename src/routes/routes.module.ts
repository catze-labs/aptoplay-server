import { Module } from "@nestjs/common";
import { ServicesModule } from "src/services/services.module";
import { AuthController } from "./auth/auth.controller";
import { UserController } from "./user/user.controller";
import { NftController } from "./nft/nft.controller";

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, UserController, NftController]
})
export class RoutesModule {}
