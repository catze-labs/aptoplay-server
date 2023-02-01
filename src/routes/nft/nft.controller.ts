import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/services/auth/auth.service";
import { NftService } from "src/services/nft/nft.service";
import { mintDto } from "./dtos";

@Controller("nft")
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly authService: AuthService
  ) {}

  @Post("/mint")
  async mint(@Body() mintDto: mintDto) {
    const { sessionTicket, walletAddress } = mintDto;

    const playFabId =
      await this.authService.validateAndGetPlayFabIdBySessionTicket(
        sessionTicket
      );

    return await this.nftService.mint(playFabId, walletAddress);
  }
}