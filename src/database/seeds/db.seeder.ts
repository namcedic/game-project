/* eslint-disable no-console */
import { DataSource, DeepPartial } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { hashPassword } from '@common/utils/password';
import { UserEntity } from '../entities/user.entity';
import { RoleEnum } from '@common/constants/role-enum';
import { GameEntity } from '../entities/game.entity';

export default class DbSeeder implements Seeder {
  public async run(ds: DataSource): Promise<void> {
    console.log('Database seeder 👊');

    console.log('👊Create users');
    await ds.manager.transaction(async (transactionalEntityManager) => {
      const adminPass = await hashPassword('Admin@123');
      const userPass = await hashPassword('user@123');
      await transactionalEntityManager.save(UserEntity, [
        {
          email: 'admin@yopmai.com',
          password: adminPass,
          firstName: 'Admin',
          lastName: 'Admin',
          role: RoleEnum.ADMIN,
          userName: 'admin',
        },
        {
          email: 'user@yopmai.com',
          password: userPass,
          firstName: 'user',
          lastName: 'user',
          role: RoleEnum.USER,
          userName: 'user',
        },
      ]);
    });

    console.log('👊Create games');
    await ds.manager.transaction(async (transactionalEntityManager) => {
      const games: DeepPartial<GameEntity>[] = [
        {
          title: 'Valorant',
          genre: 'Shooter',
          releaseDate: new Date('2020-06-02'),
          owner: { id: 1 },
        },
        {
          title: 'League of Legends',
          genre: 'MOBA',
          releaseDate: new Date('2020-06-02'),
          owner: { id: 1 },
        },
      ];
      await transactionalEntityManager.insert(GameEntity, games);
    });
  }
}
