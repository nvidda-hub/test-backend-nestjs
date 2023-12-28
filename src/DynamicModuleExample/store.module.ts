import { DynamicModule, Module } from "@nestjs/common"
import { StoreService } from "./store.service"

const DEFAULT_CACHE_STORE = 'DEFAULT_CACHE'
const DEFAULT_STORE_TYPE = 'MEMORY'

export interface StoreOptions {
    storeName : string,
    storeType : string
}

@Module({
    providers : [StoreService],
})
export class StoreModule {
    static register(options ?: StoreOptions) : DynamicModule {
        const storeOptions = Object.assign(
            {
                storeName: DEFAULT_CACHE_STORE,
                storeType : DEFAULT_STORE_TYPE
            },
            options
        )
        return {
            module : StoreModule,
            providers : [
                {
                    provide: 'STORE_OPTIONS',
                    useValue : storeOptions
                }
            ]
        }
    }
}