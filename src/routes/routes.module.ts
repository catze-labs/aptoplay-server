import { Module } from "@nestjs/common";
import { ServicesModule } from "src/services/services.module";
import { AuthController } from "./auth/auth.controller";
import { UserController } from "./user/user.controller";

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, UserController]
})
export class RoutesModule {}
