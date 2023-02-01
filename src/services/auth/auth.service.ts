import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { AptoPlayError } from "aptoplay-core";
import { AptoplayService } from "../aptoplay/aptoplay.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aptoplayService: AptoplayService
  ) {}

  async registerWithEmail(email: string, password: string) {
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

  async loginWithEmail(email: string, password: string) {
    const user: number = await this.prismaService.user.count({
      where: {
        email
      }
    });

    if (user === 0) {
      throw new HttpException("User not found", 404);
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

  async registerWithGoogleAccount(accessToken: string) {
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
}
