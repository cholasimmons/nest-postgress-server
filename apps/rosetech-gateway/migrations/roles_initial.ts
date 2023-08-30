import { Injectable } from "@nestjs/common";
import { Connection, DataSource, Migration, MigrationInterface, Repository } from "typeorm";
import { UserEntity } from "../src/users/entity/user.entity";
import { RoleEntity } from "../src/users/roles/roles.entity";

@Injectable()
export class InitialMigration implements Migration {

  constructor(private readonly repo: Repository<RoleEntity>) {}

    id: number | undefined;
    timestamp: number;
    name: string;
    instance?: MigrationInterface | undefined;
    transaction?: boolean | undefined;

  async up() {
    // await this.repo.createMigrationTable();
    // await this.repo.runMigrations();

    const role = new RoleEntity();
    role.name = 'guest';
    await this.repo.save(role);
  }

  async down() {
    // await this.repo.dropMigrations();
    // await this.repo.dropTable('roles');
    // await this.repo.dropTable('user_roles');
  }

}