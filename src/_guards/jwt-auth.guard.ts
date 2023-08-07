
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/_decorators/public.decorator';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector, private configSvc: ConfigService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(), context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
      
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Guard found no security token');
      }

      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configSvc.get('jwt.secret')
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        console.log('Protected route',request);
        
      } catch {
        throw new UnauthorizedException('Guard couldnot verify security token');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  