import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { AppService } from "./app.service";
import { ServerHealth } from "./types";

@Controller()
@ApiTags("Server")
export class AppController {
  constructor(private readonly appService: AppService) {}

  private health: ServerHealth = { status: true };

  @Get("/health")
  @ApiResponse({
    status: 200,
    description: "Returns the server health",
    schema: {
      type: "object",
      properties: {
        status: {
          type: "boolean",
          description: "The server health status"
        }
      }
    }
  })
  healthCheck(): ServerHealth {
    return this.health;
  }
}
