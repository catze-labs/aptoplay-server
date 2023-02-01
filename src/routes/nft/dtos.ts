import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class mintDto {
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
}
