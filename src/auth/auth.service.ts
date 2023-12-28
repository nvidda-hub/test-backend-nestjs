import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/User.service';

@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService : JwtService){}
    async login(username: string, pass: string){
        const user = await this.userService.findOne(username)
        if (user?.password !== pass) {
            throw new UnauthorizedException();
          }
          const { password, ...result } = user;
          const payload = { sub: user.userId, username: user.username };
            return {
            access_token: await this.jwtService.signAsync(payload),
            };
    }
}
