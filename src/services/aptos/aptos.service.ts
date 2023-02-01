import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { AptosClient } from "aptos";
import { AptosNodeUrl } from "src/constants";

@Injectable()
export class AptosService extends AptosClient implements OnModuleInit {
  constructor() {
    super(AptosNodeUrl);
  }

  async onModuleInit() {
    Logger.log(`AptosService is initialized`);
    Logger.log(`Aptos APTOS_NODE_URL = ${AptosNodeUrl}`);
  }
}
