import { ApiBody, ApiExtraModels, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

class LoginUser {
    //@IsNotEmpty() readonly username: string;
    @IsNotEmpty() readonly password: string;
    @IsNotEmpty() @IsEmail() readonly email: string;
}
export {LoginUser as LoginUserDto}