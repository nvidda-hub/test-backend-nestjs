import { Body, Controller, Get, Post, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from 'src/User/User.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/Guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private userService : UserService, private authService : AuthService){}
    @Post('/login')
    async login(@Body('username') username: string, @Body('pass') pass: string){
        return this.authService.login(username, pass)
    }

    
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req : Request) {
    console.log("Req: ", req)
    // return req.user;
  }
}
