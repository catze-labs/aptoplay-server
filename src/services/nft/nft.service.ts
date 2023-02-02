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
  async mint(
    playFabId: string,
    walletAddress: string,
    publicKey: string,
    privateKey: string
  ) {
    this.aptoplayService.setAptosSystemAccountObject({
      address: walletAddress,
      publicKeyHex: publicKey,
      privateKeyHex: privateKey
    });

    try {
      const txHash: string = await this.aptoplayService.mintToSystemWallet(
        "mint"
      );

      const tokenCount: number = await this.prismaService.token.count();
      const token = await this.prismaService.token.create({
        data: {
          tokenId: (tokenCount + 1).toString(),
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
      return await this.aptoplayService.getGameStatisticsByStatisticNamesForNFTMetadata(
        sessionTicket,
        UserStatisticNames
      );
    } catch (err) {
      if (err instanceof AptoPlayError) {
        console.log(err.name);
        throw new HttpException(err.message, err.code);
      }
    }
  }

  async testMint(playFabId: string): Promise<token> {
    const tokenCount: number = await this.prismaService.token.count();

    const newMintedtoken: token = await this.prismaService.token.create({
      data: {
        tokenId: (tokenCount + 1).toString(),
        txHash: `0x${randomString(64)}`,
        user: {
          connect: {
            playFabId
          }
        }
      }
    });

    return newMintedtoken;
  }

  async testGetMetaData(sessionTicket: string) {
    return await this.aptoplayService.getGameStatisticsByStatisticNamesForNFTMetadata(
      sessionTicket,
      UserStatisticNames
    );
  }
}
