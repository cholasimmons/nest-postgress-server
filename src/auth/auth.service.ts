import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/_interfaces/payload.interface';

import { LoginStatus, RegistrationStatus } from 'src/_interfaces/status.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersSvc: UsersService, private readonly jwtSvc: JwtService, private configSvc: ConfigService){}
    /**
     * Local-strategy method
     * @param payload 
     * @returns user
     */
    async validateUser(payload: JwtPayload): Promise<UserDto> { 
        const user: UserDto = await this.usersSvc.findByPayload(payload);

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
    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        // find user in db    
        const user: UserDto = await this.usersSvc.findByLogin(loginUserDto);

        if(!user) return { success: false, message: 'No User found' };

        const payload = {email: user.email, sub: user.id, roles: user.roles}
        
        // generate and sign token    
        const token = await this._createToken(payload);
        
        // { success: true, message: 'Success' }
        return token ;
    }

    private async _createToken(payload: any): Promise<any> {
        const userPayload: JwtPayload = payload;

        if(!userPayload) throw new HttpException('Unable to create token', HttpStatus.NOT_FOUND, {cause:'User info not provided'})

        const token = await this.jwtSvc.signAsync(userPayload, {privateKey:process.env.JWT_SECRET?.toString(), expiresIn: parseInt(process.env.JWT_EXPIRESIN!,10)});

        return { token };
    }

    async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = { success: true, message: 'User Registered!' };

        try {
            // const user = await this.usersSvc.findOne(createUserDto);

            // if(user) throw new HttpException('User already exists', HttpStatus.CONFLICT);

            const returnedUser: UserDto = await this.usersSvc.createUser(createUserDto);
            
            status = { success: true, message: `User ${returnedUser.username} created!` };
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
