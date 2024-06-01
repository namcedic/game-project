import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {RoleEnum} from "../../common/constants/enum";
import {Game} from "./game.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    readonly id: number

    @Column( { name: 'user_name', unique: true, length: 50, nullable: false })
    userName: string

    @Column({name: 'first_name', length: 50, nullable: false})
    firstName: string

    @Column({name: 'last_name', length: 50, nullable: false})
    lastName: string

    @Column({name: 'email', unique: true, nullable: false})
    email: string

    @Column({name: 'password', nullable: false})
    password: string

    @Column({name: 'is_active', default: true})
    isActive: boolean

    @Column({
        name: 'role',
        type: 'enum',
        enum: RoleEnum,
        nullable: false,
    })
    role: RoleEnum;

    @OneToMany(() => Game, game => game.user)
    games: Game[];
}
