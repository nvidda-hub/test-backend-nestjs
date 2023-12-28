import { Controller, Get, Res, Req } from '@nestjs/common';
import { CookieService } from './cookie.service';

@Controller()
export class CookieController {
    constructor(
        private cookieService : CookieService
    ){

    }
  @Get('set')
  setCookie(@Res({passthrough : true}) res) {
    return this.cookieService.setCookie(res)
  }

  @Get('get')
  getCookie(@Req() req) {
    return this.cookieService.getCookie(req)
  }
}
