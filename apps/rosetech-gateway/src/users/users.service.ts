import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto } from 'src/_utilities/mapper';
import { UserRepository } from './user.repository';
import { Role } from 'src/_enums/role.enum';
import { comparePasswords } from 'src/_utilities/password.helper';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ){}

  /*
  private users: UserEntity[] = [
      {
        id: '0011',
        username: "admin",
        password: "admin",
        email: "admin@email.com",
        roles: [Role.Guest],
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: '0012',
        username: "root",
        password: "root",
        email: "root@email.com",
        roles: [Role.Guest],
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: '0013',
        username: "pass",
        password: "pass",
        email: "pass@email.com",
        roles: [Role.Customer],
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: '4',
        username: "cholasimmons",
        password: "Password1#",
        email: "cholasimmons@outlook.com",
        roles: [Role.Admin],
        createdAt: new Date(),
        isActive: true,
      },
  ];
  */

  async findOne(email: string): Promise<UserEntity> {
    // console.log('[USER SERVICE] findOne(email) ',email,' User: ',email);
    const user = await this.userRepo.findOne({where: { email} });

    if(!user) new NotFoundException('User not found');
  
    return user!
  }


  async findByLogin({email, password} : LoginUserDto): Promise<UserDto> {    
    const user = await this.userRepo.findOne({ where: {email} });

    //console.log('[Users Service] LoginUserDto: ', loginUserDto.email);
    
    if(!user) throw new NotFoundException('User not found');

    const passAlike = comparePasswords(user!.password, password);

    if(!passAlike) throw new NotFoundException('User not found');
    
    return toUserDto(user!);
    // return user;
  }

  
  async findByPayload(payload: any): Promise<UserEntity> {
    return await this.findOne(payload);
  }
  

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

    const { password, email } = createUserDto;

    let user = new UserEntity;
    user.email = email.trim()
    user.password = password.trim()

    return await this.userRepo.save(user);
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ id });
    
    if(!user) new NotFoundException('No User with that ID');

    return toUserDto(user!);
  }
/*
  async createMany(users: UserEntity[]){
    await this.dataSource.transaction(async manager => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    })
  }
*/
  async findAll(): Promise<UserDto[]>{
    return this.userRepo.find();
  }

  async remove(id: number): Promise<void>{
    await this.userRepo.delete(id);
  }
}