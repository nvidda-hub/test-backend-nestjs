import { MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { CatModule } from './Cats/cat.module';
import { FunctionalLogger, LoggerMiddleware } from './Middleware/Logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User/User.entity';
import { dataSourceOptions } from 'database/data.source';
import { UserModule } from './User/User.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './Cron/tasks.service';
import { MyLoggerService } from './Logger/logger.service';
import { CookieMiddleware } from './Middleware/cookie.middleware';
import { CookieController } from './Cookie/cookie.controller';
import { CookieService } from './Cookie/cookie.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { CookieModule } from './Cookie/cookie.module';
import { MyLoggerModule } from './Logger/logger.module';
import { StoreModule } from './DynamicModuleExample/store.module';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { AppExceptionFilterCustom } from './Exception/app-exception.filter';

const ROUTES = [
  {
    path : '/v1/user', module : UserModule
  },
  {
    path : 'cats', module : CatModule
  },
  {
    path : 'cookie', module : CookieModule
  },

]

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache,
      isGlobal : true
    }),
    ConfigModule.forRoot({
        envFilePath: process.env.NODE_ENV === 'PROD' ? '.env' : `${process.env.NODE_ENV}.env`, // custom env file path
        ignoreEnvFile: false, // disabling env varaible loading
        isGlobal: true,  // When you want to use ConfigModule in other modules, you'll need to import it (as is standard with any Nest module). Alternatively, declare it as a global module by setting the options object's isGlobal property to true, as shown below. In that case, you will not need to import ConfigModule in other modules once it's been loaded in the root module (e.g., AppModule).
        load : [configuration],  // The value assigned to the load property is an array, allowing you to load multiple configuration files (e.g. load: [databaseConfig, authConfig])
        cache: true,   // As accessing process.env can be slow, with this option to increase the performance of ConfigService#get method when it comes to variables stored in process.env
        expandVariables : true  // Enable environment variable expansion using the expandVariables property
    }),
    EventEmitterModule.forRoot({
      wildcard: false,           // set this to `true` to use wildcards
      delimiter: '.',            // the delimiter used to segment namespaces
      newListener: false,        // set this to `true` if you want to emit the newListener event
      removeListener: false,    // set this to `true` if you want to emit the removeListener event
      maxListeners: 10,        // the maximum amount of listeners that can be assigned to an event
      verboseMemoryLeak: false,  // show event name in memory leak message when more than maximum amount of listeners is assigned
      ignoreErrors: false,       // disable throwing uncaughtException if an error event is emitted and it has no listeners
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : (configService : ConfigService) => dataSourceOptions,
      inject : [ConfigService]
    }),
    RouterModule.register(ROUTES),
    StoreModule.register({
      storeName : 'MY_STORE', 
      storeType : 'REDIS'
    }),
    CatModule,
    UserModule,
    ScheduleModule.forRoot(),
    AuthModule,
    CookieModule,
    MyLoggerModule
  ],
  controllers: [CookieController],
  providers: [MyLoggerService, CookieService, {provide : APP_FILTER, useClass : AppExceptionFilterCustom}],
})

export class AppModule implements NestModule {
  constructor(){
    console.log("NODE ENV : ", process.env.NODE_ENV)
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(FunctionalLogger)
    .exclude({path:'/', method:RequestMethod.GET})
    .forRoutes({path : '*', method : RequestMethod.ALL})

    consumer
    .apply(CookieMiddleware)
    .forRoutes('*')

  }
}
