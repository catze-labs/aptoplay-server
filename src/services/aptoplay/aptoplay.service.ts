import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { AptoPlay } from "aptoplay-core";
import { MintingContractInformation } from "src/constants";

@Injectable()
export class AptoplayService extends AptoPlay implements OnModuleInit {
  constructor() {
    super(
      process.env.TITLE_ID,
      process.env.X_SECRET_KEY,
      "https://fullnode.devnet.aptoslabs.com",
      "https://faucet.devnet.aptoslabs.com",
      {
        mint: MintingContractInformation
      },
      {
        address: process.env.SYSTEM_WALLET_ADDRESS,
        publicKeyHex: process.env.SYSTEM_WALLET_PUBLICKEY,
        privateKeyHex: process.env.SYSTEM_WALLET_PRIVATE_KEY
      }
    );
  }

  async onModuleInit() {
    Logger.log(`AptoplayService is initialized`);
    Logger.log(`AptoPlay TITLE_ID = ${process.env.TITLE_ID}`);
    Logger.log(`AptoPlay X-SECRET-KEY = ${process.env.X_SECRET_KEY}`);
  }
}
