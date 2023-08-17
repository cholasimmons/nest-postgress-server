import { IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/_enums/role.enum";

class User {  
    @IsNotEmpty() id: string;

    @IsNotEmpty()
    @IsEmail(undefined, {message: 'An email is required'})
    email: string;

    @IsNotEmpty()
    @IsArray()
    roles: Role[];

    @IsNotEmpty() @IsDate() createdAt: Date;
    @IsDate() updatedAt?: Date;
    @IsNotEmpty() @IsBoolean() isActive: boolean;
    @IsNotEmpty() @IsBoolean() isVerified: boolean;
}
export {User as UserDto}