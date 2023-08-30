import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { UserDto } from "../users/dto/user.dto";
import { UserEntity } from "../users/entity/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, email, isActive, createdAt, roles, isVerified } = data;
    
    // Basically get's rid of the password
    let userDto: UserDto = { id, email, createdAt, roles, isActive, isVerified };
    return userDto;
};
