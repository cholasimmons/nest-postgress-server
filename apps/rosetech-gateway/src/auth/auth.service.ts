import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtToken } from 'src/_interfaces/payload.interface';

import { LoginStatus, RegistrationStatus } from 'src/_interfaces/status.interface';
import { toUserDto } from 'src/_utilities/mapper';
import { comparePasswords } from 'src/_utilities/password.helper';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersSvc: UsersService, private readonly jwtSvc: JwtService, private configSvc: ConfigService){}
    
    /**
     * Local-strategy method
     * @param payload 
     * @returns user
     */
    async validateUser({email}: JwtPayload): Promise<UserDto> { 
        const user: UserDto = await this.usersSvc.findOne(email);

        if (!user) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }

        return user;
    }

    /**
     * JWT based method
     * @param loginUserDto
     * @returns token
     */
    async login(loginUserDto: LoginUserDto): Promise<JwtToken> {    
        const user: UserDto|null = await this.usersSvc.findByLogin(loginUserDto);

        if(!user) {
            throw new HttpException('No User with those credentials exists', HttpStatus.NOT_FOUND);
        }
   
        const payload: JwtPayload = {email: user.email, sub: user.id, roles: user.roles}
        
        // generate and sign token    
        const token = await this._createToken(payload);
        
        return token ;
    }

    private async _createToken(payload: JwtPayload): Promise<JwtToken> {
        const userPayload: JwtPayload = payload;

        if(!userPayload) throw new HttpException('Unable to create token', HttpStatus.NOT_FOUND, {cause:'User info not provided'})

        const token = await this.jwtSvc.signAsync(userPayload, {privateKey:process.env.JWT_SECRET?.toString(), expiresIn: Number(process.env.JWT_EXPIRESIN)});

        return { token };
    }

    async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = { success: false, message: 'Registeration was not successful' };

        try {
            const user: UserDto = await this.usersSvc.findOne(createUserDto.email);

            if(user) return status = {success: false, message: 'User already exists'};

            const returnedUser: UserDto = await this.usersSvc.createUser(createUserDto);

            if(!returnedUser) return status;
            
            status = { success: true, message: `User ${returnedUser.email} successfully created!` };
        } catch (err) {
            status = { success: false, message: `${err}` };
            // throw new ExceptionsHandler() 
        }
        return status;  
    }

    async signOut(): Promise<string> {
        return "Successfully signed out"
    }
}
