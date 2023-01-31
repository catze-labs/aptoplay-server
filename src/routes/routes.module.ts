import { Module } from "@nestjs/common";
import { ServicesModule } from "src/services/services.module";

@Module({
  imports: [ServicesModule],
  controllers: []
})
export class RoutesModule {}
