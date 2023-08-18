import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { Role } from 'src/_enums/role.enum';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    // @Exclude()
    password: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false})
    roles: Role[];

    @Column({type: 'bool', default: false})
    isVerified: boolean;

    @BeforeInsert()
    async beforeInsert(): Promise<void> {
      const salt = await bcrypt.genSalt(3);
      const pass = this.password;
      this.password = await bcrypt.hash(pass, salt);
      this.roles = [Role.Guest]
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
