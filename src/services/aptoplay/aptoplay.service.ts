import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { AptoPlay } from "aptoplay-core";

@Injectable()
export class AptoplayService extends AptoPlay implements OnModuleInit {
  constructor() {
    super(process.env.TITLE_ID, process.env.X_SECRET_KEY);
  }

  async onModuleInit() {
    Logger.log(
      `AptoService is constructed. ${process.env.TITLE_ID} ${process.env.X_SECRET_KEY}`
    );
  }
}
