import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { AptoPlay } from "aptoplay-core";

@Injectable()
export class AptoplayService extends AptoPlay implements OnModuleInit {
  constructor() {
    super(process.env.TITLE_ID, process.env.X_SECRET_KEY);
  }

  async onModuleInit() {
    Logger.log(`AptoService is initialized`);
    Logger.log(`AptoPlay TITLE_ID = ${process.env.TITLE_ID}`);
    Logger.log(`AptoPlay X-SECRET-KEY = ${process.env.X_SECRET_KEY}`);
  }
}
