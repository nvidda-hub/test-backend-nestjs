import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/User/User.module';
import { UserService } from 'src/User/User.service';
import { EventListener } from 'src/Event/event-listener.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.modules.constants';
import { MyLoggerService } from 'src/Logger/logger.service';
import { StoreModule } from 'src/DynamicModuleExample/store.module';

@Module({
  imports : [
    forwardRef(() => UserModule), 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    StoreModule.register()],
  controllers: [AuthController],
  providers: [AuthService,UserService, EventListener, MyLoggerService]
})
export class AuthModule {}
