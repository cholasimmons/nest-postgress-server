import { Body, Controller, Get,Header,HttpCode,HttpException,HttpStatus,NotFoundException,Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../_decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginStatus, RegistrationStatus } from '../_interfaces/status.interface';
import { Request, Response } from 'express';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from '../_guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { JwtToken } from '../_interfaces/payload.interface';
import { RolesGuard } from '../_guards/roles.guard';
import { Roles } from '../_decorators/roles.decorator';
import { Role } from '../_enums/role.enum';
import { UserDto } from '../users/dto/user.dto';
import { toUserDto } from '../_utilities/mapper';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersSvc: UsersService){}

    // @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    // @Header('accept', 'application/json')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<JwtToken> {
        // console.log('[Auth Controller]: Attempting to sign in: ',req);
        return await this.authService.login(loginUserDto);
        // return await this.authService.login(req.user);
        // return { success: true, message: `Welcome to our Server ${loginUserDto.email}`}
    }


    @Get('profile')
    @Roles(Role.Guest)
    // @Public()
    public async getProfile(@Req() req: Request){
        const {email}: any = req.user;

        const user = await this.usersSvc.findOne(email);

        if(!user) throw new NotFoundException('Could not retrieve that account');

        return toUserDto(user);
        // return `Profile: ${payload.email}`;
    }


    @Post('logout')
    // @HttpCode(HttpStatus.ACCEPTED)
    public async signOut(){
        return await this.authService.signOut();
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
    async listAllUsers(){
        return await this.usersSvc.findAll(true);
    }

    @Get('activeusers')
    async listActiveUsers(){
        return await this.usersSvc.findAll();
    }

    @Public()
    @Get()
    hello(){
        return this.authService.external('Chola')
    }
}