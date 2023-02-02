import { HttpException } from "@nestjs/common";
import axios from "axios";

export async function getGoogleProfileByAccessToken(
  accessToken: string
): Promise<string> {
  try {
    const userInfoRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        params: {
          access_token: accessToken
        }
      }
    );

    return userInfoRes.data.email;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new HttpException(err.message, err.response.status);
    }
  }
}

export function randomString(length: number): string {
  let result = "";
  let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
