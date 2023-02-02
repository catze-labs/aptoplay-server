import { HttpException, Injectable } from "@nestjs/common";
import { AptoPlayError } from "aptoplay-core";
import { UserStatisticNames } from "src/constants";
import { AptoplayService } from "../aptoplay/aptoplay.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class NftService {
  constructor(private readonly aptoplayService: AptoplayService) {}
  async mint(playFabId: string, sessionTicket: string, walletAddress: string) {
    // get PlayFab play data
    try {
      const gameData =
        await this.aptoplayService.getGameStatisticsByStatisticNamesForNFTMetadata(
          sessionTicket,
          UserStatisticNames
        );
    } catch (err) {
      if (err instanceof AptoPlayError) {
        console.log(err.name);
        throw new HttpException(err.message, err.code);
      }
    }

    // store NFT image in IPFS
    // Make metadata of NFT with image uri and play data
  }

  async burn(playFabId: string, tokenId: string) {}
}
