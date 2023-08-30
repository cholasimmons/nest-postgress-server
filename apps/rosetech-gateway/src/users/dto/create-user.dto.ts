import { IsNotEmpty, IsEmail, MinLength, IsArray, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../_enums/role.enum';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

class CreateUser {
    // @IsNotEmpty() @MinLength(3) username: string;
    @IsNotEmpty() @IsEmail() email: string;

    @IsNotEmpty() @Matches(passwordRegEx, {message: 'Password doesn\'t comply'})
    password: string;

    // @IsNotEmpty() @IsArray() roles: Role[];
    // photos: PhotoEntity[]
}
export {CreateUser as CreateUserDto}