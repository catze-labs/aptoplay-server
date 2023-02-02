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
  async mint(playFabId: string, sessionTicket: string, walletAddress: string) {
    // get PlayFab play data
    let gameData;
    try {
      gameData =
        await this.aptoplayService.getGameStatisticsByStatisticNamesForNFTMetadata(
          sessionTicket,
          UserStatisticNames
        );

      console.log(gameData);
    } catch (err) {
      if (err instanceof AptoPlayError) {
        console.log(err.name);
        throw new HttpException(err.message, err.code);
      }
    }

    // store NFT image in IPFS
    // Make metadata of NFT with image uri and play data

    // TODO
    /*
      만약 컨트랙 배포나, 민팅로직 구현이 늦어질 경우에
      더미데이터를 만들어서 내려준다.
      {
        tokenId : '',
        succeedTxHash : ''
      }
    */
    return gameData;
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
