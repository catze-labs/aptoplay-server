import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { AptoPlayError } from "aptoplay-core";
import { getGoogleProfileByAccessToken } from "src/utils";
import { AptoplayService } from "../aptoplay/aptoplay.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aptoplayService: AptoplayService
  ) {}

  async registerWithEmail(email: string, password: string) {
    const count: number = await this.prismaService.user.count({
      where: {
        email
      }
    });

    if (count > 0) {
      throw new BadRequestException("User already exists");
    }

    const user = await this.prismaService.user.create({
      data: {
        email
      }
    });

    let aptoPlayUser;
    try {
      aptoPlayUser = await this.aptoplayService.registerUser(email, password);
    } catch (err: unknown) {
      if (err instanceof AptoPlayError) {
        await this.prismaService.user.delete({
          where: {
            id: user.id
          }
        });

        Logger.error(err);
        throw new HttpException(err.message, err.code);
      } else {
        throw new InternalServerErrorException(err);
      }
    }

    await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        playFabId: aptoPlayUser.playFabId
      }
    });

    return aptoPlayUser;
  }

  async registerWithGoogleAccount(accessToken: string) {
    const email = await getGoogleProfileByAccessToken(accessToken);
    const count: number = await this.prismaService.user.count({
      where: {
        email
      }
    });

    if (count > 0) {
      throw new BadRequestException("User already exists");
    }

    let aptoPlayUser;
    try {
      aptoPlayUser = await this.aptoplayService.registerWithGoogleAccount(
        accessToken
      );
    } catch (err: unknown) {
      if (err instanceof AptoPlayError) {
        Logger.error(err);
        throw new HttpException(err.message, err.code);
      } else {
        throw new InternalServerErrorException(err);
      }
    }

    return aptoPlayUser;
  }

  async loginWithEmail(email: string, password: string) {
    const count: number = await this.prismaService.user.count({
      where: {
        email
      }
    });

    if (count === 0) {
      throw new NotFoundException("User not found");
    }

    let aptoPlayUser;
    try {
      aptoPlayUser = await this.aptoplayService.login(email, password);
    } catch (err: unknown) {
      if (err instanceof AptoPlayError) {
        Logger.error(err);
        throw new HttpException(err.message, err.code);
      } else {
        throw new InternalServerErrorException(err);
      }
    }

    return aptoPlayUser;
  }

  async loginWithGoogleAccount(accessToken: string) {
    const email = await getGoogleProfileByAccessToken(accessToken);
    const count: number = await this.prismaService.user.count({
      where: {
        email
      }
    });

    if (count === 0) {
      throw new NotFoundException("User not found");
    }

    let aptoPlayUser;
    try {
      aptoPlayUser = await this.aptoplayService.loginWithGoogleAccount(
        accessToken
      );
    } catch (err: unknown) {
      if (err instanceof AptoPlayError) {
        Logger.error(err);
        throw new HttpException(err.message, err.code);
      } else {
        throw new InternalServerErrorException(err);
      }
    }

    return aptoPlayUser;
  }

  async validateAndGetPlayFabIdBySessionTicket(
    sessionTicket: string
  ): Promise<string> {
    try {
      return await this.aptoplayService.validateAndGetPlayFabIdBySessionTicket(
        sessionTicket
      );
    } catch (err: any) {
      Logger.error(err);
      if (err instanceof AptoPlayError) {
        switch (err.name) {
          case "PLAYFAB_SESSION_TICKET_EXPIRED": {
            throw new UnauthorizedException(err.rawError);
          }

          case "PLAYFAB_SESSION_TICKET_VALIDATION_ERROR": {
            throw new BadRequestException(err.rawError);
          }

          default: {
            throw new InternalServerErrorException(err.rawError);
          }
        }
      }

      throw new InternalServerErrorException(err);
    }
  }
}
