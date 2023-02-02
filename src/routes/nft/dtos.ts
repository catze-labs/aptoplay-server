import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class mintToSystemWalletDto {
  @ApiProperty({
    description: "PlayFab session ticket of user (token like.)"
  })
  @IsString()
  @IsNotEmpty()
  sessionTicket: string;

  @ApiProperty({
    description: "User Aptos chain Wallet Address"
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({
    description: "User Aptos chain Wallet Address"
  })
  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty({
    description: "User Aptos chain Wallet Address"
  })
  @IsString()
  @IsNotEmpty()
  privateKey: string;
}

export class testMintDto {
  @ApiProperty({
    description: "PlayFab session ticket of user (token like.)"
  })
  @IsString()
  @IsNotEmpty()
  sessionTicket: string;
}

export class getMetadataDto {
  @ApiProperty({
    description: "PlayFab session ticket of user (token like.)"
  })
  @IsString()
  @IsNotEmpty()
  sessionTicket: string;
}

export class testGetMetadataDto {
  @ApiProperty({
    description: "PlayFab session ticket of user (token like.)"
  })
  @IsString()
  @IsNotEmpty()
  sessionTicket: string;
}
