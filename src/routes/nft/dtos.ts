import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class mintToSystemWalletDto {
  @ApiProperty({
    description: "PlayFab session ticket of user (token like.)"
  })
  @IsString()
  @IsNotEmpty()
  sessionTicket: string;
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
