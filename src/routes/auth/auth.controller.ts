import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AptoplayService } from "src/services/aptoplay/aptoplay.service";
import { AuthService } from "src/services/auth/auth.service";
import {
  registerWithEmailAddressSchema,
  registerWithGoogleAccountSchema
} from "../schema";
import {
  loginWithEmailAddressDto,
  registerWithEmailAddressDto,
  registerWithGoogleAccountDto
} from "./dtos";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/registerWithEmail")
  @ApiBody(registerWithEmailAddressSchema)
  async registerWithEmail(
    @Body() registerWithEmailDto: registerWithEmailAddressDto
  ) {
    const { email, password } = registerWithEmailDto;
    return await this.authService.registerWithEmail(email, password);
  }

  @Post("/registerWithGoogle")
  @ApiBody(registerWithGoogleAccountSchema)
  async registerWithGoogleAccount(
    @Body() registerWithGoogleAccountDto: registerWithGoogleAccountDto
  ) {
    const { accessToken } = registerWithGoogleAccountDto;
    return await this.authService.registerWithGoogleAccount(accessToken);
  }

  @Post("/loginWithEmail")
  @ApiBody(registerWithEmailAddressSchema)
  @HttpCode(200)
  async loginWithEmail(
    @Body() loginWithEmailAddressDto: loginWithEmailAddressDto
  ) {
    const { email, password } = loginWithEmailAddressDto;
    return await this.authService.loginWithEmail(email, password);
  }
}
