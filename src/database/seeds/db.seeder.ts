/* eslint-disable no-console */
import {DataSource, DeepPartial} from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension';
import {hashPassword} from "../../common/utils/password";
import {User} from "../entities/user.entity";
import {RoleEnum} from "../../common/constants/enum";
import {Game} from "../entities/game.entity";

export default class DbSeeder implements Seeder {
  public async run(
    ds: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('Database seeder 👊');

    console.log('👊Create users');
    await ds.manager.transaction(async (transactionalEntityManager) => {
      const adminPass = await hashPassword('Admin@123');
      const userPass = await hashPassword('user@123');
      await transactionalEntityManager.save(User, [{
        email: 'admin@yopmai.com',
        password:adminPass,
        firstName: 'Admin',
        lastName: 'Admin',
        role: RoleEnum.ADMIN,
        userName: 'admin',
      },{
        email: 'user@yopmai.com',
        password:userPass,
        firstName: 'user',
        lastName: 'user',
        role: RoleEnum.USER,
        userName: 'user',
      }]);
    });

    console.log('👊Create games');
    await ds.manager.transaction(async (transactionalEntityManager) => {
      const games: DeepPartial<Game>[] = [
        {
          title: 'Valorant',
          genre: 'Shooter',
          releaseDate: new Date('2020-06-02'),
          user: {id: 1},
        },
        {
          title: 'League of Legends',
          genre: 'MOBA',
          releaseDate: new Date('2020-06-02'),
          user: {id: 1},
        },
      ];
      await transactionalEntityManager.insert(
        Game,
          games,
      );
    });
  }
}