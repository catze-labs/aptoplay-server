import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class registerWithEmailAddressDto {
  @ApiProperty({
    example: "test@test.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1234qwer!"
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class registerWithGoogleAccountDto {
  @ApiProperty({
    description: "Google OAuth2.0 access token"
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class loginWithEmailAddressDto {
  @ApiProperty({
    example: "test@test.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1234qwer!"
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class loginWithGoogleAccountDto {
  @ApiProperty({
    description: "Google OAuth2.0 access token"
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
