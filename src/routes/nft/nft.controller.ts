import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { AuthService } from "src/services/auth/auth.service";
import { NftService } from "src/services/nft/nft.service";
import { mintDto, testMintDto, testGetMetadataDto } from "./dtos";

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

    return await this.nftService.mint(playFabId, sessionTicket, walletAddress);
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
  async getMetaData(@Param("sessionTicket") sessionTicket: string) {
    await this.authService.validateAndGetPlayFabIdBySessionTicket(
      sessionTicket
    );

    return await this.nftService.getMetaData(sessionTicket);
  }

  @Get("/test-metadata")
  async testGetMetaData(@Query() testGetMetadataDto: testGetMetadataDto) {
    const sessionTicket = testGetMetadataDto.sessionTicket;

    await this.authService.validateAndGetPlayFabIdBySessionTicket(
      sessionTicket
    );

    return await this.nftService.testGetMetaData(sessionTicket);
  }
}
