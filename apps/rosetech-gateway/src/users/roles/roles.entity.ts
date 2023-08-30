import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../entity/user.entity";

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  // @Field(() => String)
  id: string;

  @Column({type: 'text', nullable: false})
  name: string;

  // @Field(() => [UserEntity])
  // @JoinTable()
  @ManyToMany(() => UserEntity, (user) => user.roles, {
    lazy: true,
  })
  users: Promise<Array<UserEntity>>;

  // @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}

