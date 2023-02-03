import { HttpException, Injectable } from "@nestjs/common";
import { token } from "@prisma/client";
import { AptoPlayError } from "aptoplay-core";
import { UserStatisticNames } from "src/constants";
import { randomString } from "src/utils";
import { AptoplayService } from "../aptoplay/aptoplay.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NftService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aptoplayService: AptoplayService
  ) {}
  async mint(playFabId: string) {
    try {
      if (
        process.env.SYSTEM_WALLET_ADDRESS === undefined ||
        process.env.SYSTEM_WALLET_PUBLICKEY === undefined ||
        process.env.SYSTEM_WALLET_PRIVATE_KEY === undefined
      ) {
        const systemAccount = await this.prismaService.systemWallet.findUnique({
          where: {
            title: "SYSTEM_WALLET"
          }
        });

        this.aptoplayService.setAptosSystemAccountObject({
          address: systemAccount.address,
          publicKeyHex: systemAccount.publicKey,
          privateKeyHex: systemAccount.privateKey
        });
      }

      const txHash: string = await this.aptoplayService.mintToSystemWallet(
        "mint"
      );

      const token = await this.prismaService.token.create({
        data: {
          tokenRequestId: `${new Date().getTime().toString()}-${playFabId}`,
          txHash,
          user: {
            connect: {
              playFabId
            }
          }
        }
      });

      return { txHash, additionalData: token };
    } catch (err) {
      if (err instanceof AptoPlayError) {
        console.log(err.name);
        throw new HttpException(err.message, err.code);
      }
    }
  }

  async getMetaData(sessionTicket: string) {
    try {
      const res =
        await this.aptoplayService.getGameStatisticsByStatisticNamesForNFTMetadata(
          sessionTicket,
          UserStatisticNames
        );

      UserStatisticNames.map((statisticName) => {
        if (!res.hasOwnProperty(statisticName)) {
          res[statisticName] = {
            version: 0,
            value: 0
          };
        }
      });

      return res;
    } catch (err) {
      if (err instanceof AptoPlayError) {
        console.log(err.name);
        throw new HttpException(err.message, err.code);
      }
    }
  }

  async testMint(playFabId: string) {
    const tokenCount: number = await this.prismaService.token.count();

    const newMintedtoken: token = await this.prismaService.token.create({
      data: {
        tokenRequestId: `${new Date().getTime().toString()}-${playFabId}`,
        txHash: `0x${randomString(64)}`,
        user: {
          connect: {
            playFabId
          }
        }
      }
    });

    return { txHash: newMintedtoken.txHash, additionalData: newMintedtoken };
  }
}
