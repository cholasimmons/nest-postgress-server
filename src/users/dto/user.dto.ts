import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/_enums/role.enum";

class User {  
    @IsNotEmpty() id: string;
    @IsNotEmpty() username: string;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() @IsArray() roles: Role[];
    @IsNotEmpty() @IsDate() createdAt: Date;
    @IsNotEmpty() @IsBoolean() isActive: boolean;
}
export {User as UserDto}