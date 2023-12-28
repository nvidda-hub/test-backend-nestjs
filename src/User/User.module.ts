import { Module } from "@nestjs/common";
import { UserService } from "./User.service";
import { UserController } from "./user.controller";
import { EventListener } from "src/Event/event-listener.service";
import { MyLoggerModule } from "src/Logger/logger.module";
import { MyLoggerService } from "src/Logger/logger.service";

@Module({
    imports : [],
    providers : [UserService, EventListener, MyLoggerService],
    controllers : [UserController],
    exports : []
})

export class UserModule {}