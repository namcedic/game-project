import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'title', length: 50, nullable: true})
    title: string;

    @Column({name: 'genre', length: 50, nullable: false})
    genre: string;

    @Column({name: 'release_date', nullable: false})
    releaseDate: Date;

    @ManyToOne(type => User, user => user.games)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
