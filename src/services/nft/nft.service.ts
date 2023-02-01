import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class NftService {
  constructor() {}
  async mint(playFabId: string, walletAddress: string) {
    // get PlayFab play data
    // store NFT image in IPFS
    // Make metadata of NFT with image uri and play data
  }

  async burn(playFabId: string, tokenId: string) {}
}
