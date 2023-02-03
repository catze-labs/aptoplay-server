import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/services/auth/auth.service";
import { NftService } from "src/services/nft/nft.service";
import { mintToSystemWalletDto, testMintDto, getMetadataDto } from "./dtos";

@Controller("nft")
@ApiTags("NFT")
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly authService: AuthService
  ) {}

  @Post("/mint-to-system")
  async mint(@Body() mintToSystemWalletDto: mintToSystemWalletDto) {
    const { sessionTicket } = mintToSystemWalletDto;

    const playFabId =
      await this.authService.validateAndGetPlayFabIdBySessionTicket(
        sessionTicket
      );

    return await this.nftService.mint(playFabId);
  }

  @Post("/test-mint")
  async testMint(@Body() testMintDto: testMintDto) {
    const { sessionTicket } = testMintDto;

    const playFabId =
      await this.authService.validateAndGetPlayFabIdBySessionTicket(
        sessionTicket
      );

    return await this.nftService.testMint(playFabId);
  }

  @Get("/metadata")
  async getMetaData(@Query() getMetadataDto: getMetadataDto) {
    const sessionTicket = getMetadataDto.sessionTicket;
    await this.authService.validateAndGetPlayFabIdBySessionTicket(
      sessionTicket
    );

    return await this.nftService.getMetaData(sessionTicket);
  }
}
