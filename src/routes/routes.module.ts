import { Module } from "@nestjs/common";
import { ServicesModule } from "src/services/services.module";
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { NonceController } from './nonce/nonce.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, UserController, NonceController]
})
export class RoutesModule {}
