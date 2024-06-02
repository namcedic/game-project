import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity('game')
export class GameEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'title', length: 50, nullable: true})
    title: string;

    @Column({name: 'genre', length: 50, nullable: false})
    genre: string;

    @Column({name: 'release_date', nullable: false})
    releaseDate: Date;

    @ManyToOne(() => UserEntity, user => user.games)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
