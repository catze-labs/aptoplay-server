import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { token } from "@prisma/client";
import { AptoPlayError } from "aptoplay-core";
import { PetNameCode, UserStatisticNames } from "src/constants";
import { randomString } from "src/utils";
import { AptoplayService } from "../aptoplay/aptoplay.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NftService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aptoplayService: AptoplayService
  ) {}
  async mint(playFabId: string) {
    if (
      process.env.SYSTEM_WALLET_ADDRESS === undefined ||
      process.env.SYSTEM_WALLET_PUBLICKEY === undefined ||
      process.env.SYSTEM_WALLET_PRIVATE_KEY === undefined
    ) {
      const systemAccount = await this.prismaService.systemWallet.findUnique({
        where: {
          title: "SYSTEM_WALLET"
        }
      });

      this.aptoplayService.setAptosSystemAccountObject({
        address: systemAccount.address,
        publicKeyHex: systemAccount.publicKey,
        privateKeyHex: systemAccount.privateKey
      });
    }

    let txHash: string = "";
    try {
      txHash = await this.aptoplayService.mintToSystemWallet("mint");
    } catch (err) {
      if (err instanceof AptoPlayError) {
        switch (err.name) {
          case "SMART_CONTRACT_ALIAS_ADDRESS_NOT_FOUND":
          case "SYSTEM_ACCOUNT_OBJECT_NOT_FOUND":
          case "SYSTEM_ACCOUNT_PROPERTIES_NOT_FOUND": {
            throw new NotFoundException({
              name: err.name,
              message: err.message
            });
          }

          case "APTOS_MINT_TO_SYSTEM_WALLET_ERROR": {
            throw new InternalServerErrorException({
              name: err.name,
              message: err.message
            });
          }

          default: {
            throw new InternalServerErrorException();
          }
        }
      }
    }

    let token: token;
    if (txHash.length > 0) {
      token = await this.prismaService.token.create({
        data: {
          tokenRequestId: `${new Date().getTime().toString()}-${playFabId}`,
          txHash,
          user: {
            connect: {
              playFabId
            }
          }
        }
      });
    }

    return { txHash, additionalData: token };
  }

  async getMetaData(sessionTicket: string) {
    try {
      const res =
        await this.aptoplayService.getGameStatisticsByStatisticNamesForNFTMetadata(
          sessionTicket,
          UserStatisticNames
        );

      if (res.hasOwnProperty("petName")) {
        res["petName"] = {
          value: PetNameCode[res["petName"].value],
          version: res["petName"].version
        };
      }

      UserStatisticNames.map((statisticName) => {
        if (!res.hasOwnProperty(statisticName)) {
          if (statisticName === "petName") {
            res[statisticName] = {
              version: 0,
              value: PetNameCode[1]
            };
          } else {
            res[statisticName] = {
              version: 0,
              value: 0
            };
          }
        }
      });

      return res;
    } catch (err) {
      if (err instanceof AptoPlayError) {
        console.log(err.name);
        throw new HttpException(err.message, err.code);
      }
    }
  }

  async testMint(playFabId: string) {
    const newMintedtoken: token = await this.prismaService.token.create({
      data: {
        tokenRequestId: `${new Date().getTime().toString()}-${playFabId}`,
        txHash: `0x${randomString(64)}`,
        user: {
          connect: {
            playFabId
          }
        }
      }
    });

    return { txHash: newMintedtoken.txHash, additionalData: newMintedtoken };
  }
}
