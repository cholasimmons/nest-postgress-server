import { Body, Controller, Get,Header,HttpCode,HttpException,HttpStatus,NotFoundException,Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../_decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginStatus, RegistrationStatus } from 'src/_interfaces/status.interface';
import { Request } from 'express';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { JwtToken } from 'src/_interfaces/payload.interface';

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersSvc: UsersService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    @Header('accept', 'application/json')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<JwtToken> {
        // console.log('[Auth Controller]: Attempting to sign in: ',req);
        return await this.authService.login(loginUserDto);
        // return await this.authService.login(req.user);
        // return { success: true, message: `Welcome to our Server ${loginUserDto.email}`}
    }


    @Get('profile')
    // @Public() 
    // @UseGuards(JwtAuthGuard)
    public getProfile(@Req() req: Request){
        const payload: any = req.user;
        return this.usersSvc.findOne(payload);
        // return `Profile: ${payload.email}`;
    }


    @Post('logout')
    @HttpCode(HttpStatus.ACCEPTED)
    signOut(){
        return this.authService.signOut();
    }

    @Public()
    @Post('register')
    @Header('accept', 'application/x-www-form-urlencoded')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {        
        const result: RegistrationStatus = await this.authService.register(createUserDto)

        if(!result.success) {
            throw new HttpException(result.message, HttpStatus.CONFLICT)
        }
        return result;
    }

    @Get('users')
    async listUsers(){
        return await this.usersSvc.findAll();
    }
}