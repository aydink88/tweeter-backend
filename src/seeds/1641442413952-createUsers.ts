import { UserEntity } from '../entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
//import * as users from './users.json';
import { faker } from '@faker-js/faker';

export class createUsers1641442413952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(5),
        email: faker.internet.email(),
        handle: faker.internet.userName(),
        password: '123456',
      });
    }
    await queryRunner.manager.insert(UserEntity, users);
    // await queryRunner.manager.insert(
    //   UserEntity,
    //   users.map((u) => ({ ...u, id: undefined })),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserEntity, '*');
  }
}
