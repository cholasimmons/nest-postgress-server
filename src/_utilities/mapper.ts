import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { UserDto } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entity/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, email, isActive, createdAt, roles, isVerified } = data;
    
    // Basically get's rid of the password
    let userDto: UserDto = { id, email, createdAt, roles, isActive, isVerified };
    return userDto;
};
