import { Module, OnModuleDestroy, Provider } from "@nestjs/common";
import { CatService } from "./Services/cat.service";
import { CatsController } from "./controller/cats.controller";
import { CatModuleConstants } from "./cats.contants";

const CatServiceProvider : Provider = {
    provide : CatModuleConstants.CAT_SERVICE,
    useClass : CatService
}

@Module({
    imports : [],
    providers : [CatServiceProvider],
    controllers : [CatsController]
})

export class CatModule implements OnModuleDestroy{
    onModuleDestroy() {
        console.log("Cat module destroyed")
    }
}
