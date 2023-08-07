import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { Role } from 'src/_enums/role.enum';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {

    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', nullable: false, default: '' })
    @BeforeInsert() async hashPassword?() { this.password = await bcrypt.hash(this.password!, 10)}
    @Exclude()
    password?: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false, unique: false})
    roles: Role[];

    // @OneToMany(type => PhotoEntity, photo => photo.user)
    // photos: PhotoEntity[]

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
      }
}
