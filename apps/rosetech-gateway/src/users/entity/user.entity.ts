import { Entity, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { Role } from '../../_enums/role.enum';
import { Exclude } from 'class-transformer';
import { RoleEntity } from '../roles/roles.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    // @Exclude()
    password: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;


    // @ManyToMany(() => RoleEntity, (role) => role.users, {
    //   cascade: true,
    //   lazy: true,
    // })
    // @JoinTable()
    @Column({type: 'text', array:true, nullable: true, default: [Role.Guest]})
    roles: Role[];

    @Column({type: 'bool', default: false})
    isVerified: boolean;

    @BeforeInsert()
    async beforeInsert(): Promise<void> {
      const salt = await bcrypt.genSalt(5);
      const pass = this.password;
      this.password = await bcrypt.hash(pass, salt);
      
      // if(!this.roles.length) {
      //   this.roles = [Role.Guest]
      // }
      
    }
}
/*
    @OneToMany(type => PhotoEntity, photo => photo.user)
    photos: PhotoEntity[]

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
      }
*/ 
