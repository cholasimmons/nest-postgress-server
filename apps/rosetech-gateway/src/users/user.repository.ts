import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";

export class UserRepository extends Repository<UserEntity> {
}