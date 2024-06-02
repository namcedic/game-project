import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoleEnum } from '@common/constants/role-enum';
import { GameEntity } from './game.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'user_name', unique: true, length: 50, nullable: false })
  userName: string;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({
    name: 'role',
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
  })
  role: RoleEnum;

  @OneToMany(() => GameEntity, (game) => game.owner)
  games: GameEntity[];
}
