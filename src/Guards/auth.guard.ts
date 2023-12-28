import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { jwtConstants } from "src/auth/auth.modules.constants";

export class AuthGuard implements CanActivate {
  constructor(private jwtService : JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenAndHeader(request)
    
        if (!token) {
          throw new UnauthorizedException();
        }
    
        try{
          const payload = await this.jwtService.verifyAsync(token, {secret : jwtConstants.secret})
          request['user'] = payload
        }catch(err){
          console.log("error890 : ", err)
          throw new UnauthorizedException();
  
        }
        return true
      }
  
    private extractTokenAndHeader(request : Request) : string{
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined
    }
}