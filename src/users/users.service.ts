import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/_interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { toUserDto } from 'src/_utilities/mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePasswords } from 'src/_utilities/password.helper';
import { Role } from 'src/_enums/role.enum';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private dataSource: DataSource
  ){}

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

  async findOne({email}: LoginUserDto): Promise<UserDto> {
    // const user = await this.userRepo.findOne(options);
    const user = await this.users.find(usr => usr.email === email);

    if(!user) throw new HttpException('No User found in system', HttpStatus.NO_CONTENT);
    // return toUserDto(user);
    return toUserDto(user);
  }

  async findByLogin({email, password} : LoginUserDto): Promise<UserDto> {    
    // const user = await this.userRepo.findOne({ where: {email} });
    const user: UserEntity|undefined = await this.users.find(usr => usr.email === email);

    //console.log('[Users Service] LoginUserDto: ', loginUserDto.email);
    // const user: IUser|undefined = this.users.find(usr => usr.username === loginUserDto.username);
    
    if(!user) {
        throw new HttpException('User not found', HttpStatus.NO_CONTENT);    
    }

    // compare passwords    
    const areEqual: boolean = comparePasswords(user.password!, password);
    
    if (areEqual === false) {
        throw new HttpException('Invalid credentials dude!', HttpStatus.UNAUTHORIZED);    
    }
    
    return toUserDto(user);  
    //return user;  
  }

  async findByPayload(payload: any): Promise<UserDto> {
    return await this.findOne(payload);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {    
    // console.log('[Users Service] Captured User. ',userDto.email);
    
    const { username, password, email } = createUserDto;
    
    // check if the user exists in the db
    let userByEmailInDb, userByUsernameInDb = false;

    this.users.forEach(usr => {
      usr.email === email ? userByEmailInDb = true : userByEmailInDb = false;
      usr.username === username ? userByUsernameInDb = true : userByUsernameInDb = false;
    });
    /* const userInDb = await this.userRepo.findOne({ 
      where: { email }
    }); */
    if(userByEmailInDb) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);    
    }
    if(userByUsernameInDb) {
      throw new HttpException('Username is taken', HttpStatus.CONFLICT);    
    }
    // const user: UserEntity = await this.userRepo.create({ username, password, email });
    const newUser = { id: (this.users.length+1).toString(), username: username, email: email, roles: [Role.Guest], createdAt: new Date(), isActive: true}
    this.users.push(newUser)
    // await this.userRepo.save(user);
    return toUserDto(newUser);  
  }


  async findUsersById(id: string) {
    // return this.userRepo.findBy({ id: In([]) });
    return this.users.find(usr => usr.id === id);
  }


  async createMany(users: UserEntity[]){
    await this.dataSource.transaction(async manager => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    })
  }

  async findAll(){
    return this.users.map(usr => {
      return toUserDto(usr)
    });
  }
}