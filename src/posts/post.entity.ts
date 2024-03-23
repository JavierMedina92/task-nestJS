import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


@Entity()
export class Post {
    @PrimaryColumn()
    id: number

    @Column()
    tittle: string

    @Column()
    content: string

    @Column()
    authorId: number

    @ManyToOne(() => User, user => user.posts)
    author: User
}