import { IsNotEmpty, IsEmail, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/_enums/role.enum';

class CreateUser {
    @ApiProperty() @IsNotEmpty() @MinLength(3) username: string;
    @IsNotEmpty() @MinLength(6) password: string;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() @IsArray() roles: Role[];
    // photos: PhotoEntity[]
}
export {CreateUser as CreateUserDto}