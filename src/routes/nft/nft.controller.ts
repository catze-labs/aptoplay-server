import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/services/auth/auth.service";
import { NftService } from "src/services/nft/nft.service";
import {
  mintToSystemWalletDto,
  testMintDto,
  getMetadataDto,
  testGetMetadataDto
} from "./dtos";

@Controller("nft")
@ApiTags("NFT")
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly authService: AuthService
  ) {}

  @Post("/mint-to-wallet")
  async mint(@Body() mintToSystemWalletDto: mintToSystemWalletDto) {
    const { sessionTicket, walletAddress, publicKey, privateKey } =
      mintToSystemWalletDto;

    const playFabId =
      await this.authService.validateAndGetPlayFabIdBySessionTicket(
        sessionTicket
      );

    return await this.nftService.mint(
      playFabId,
      walletAddress,
      publicKey,
      privateKey
    );
  }

  @Post("/test-mint")
  async testMint(@Body() testMintDto: testMintDto) {
    const { sessionTicket } = testMintDto;

    const playFabId =
      await this.authService.validateAndGetPlayFabIdBySessionTicket(
        sessionTicket
      );

    // return await this.nftService.testMint(playFabId);
  }

  @Get("/metadata")
  async getMetaData(@Query() getMetadataDto: getMetadataDto) {
    const sessionTicket = getMetadataDto.sessionTicket;
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
