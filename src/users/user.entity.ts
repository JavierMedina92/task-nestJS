import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Profile } from "./profile.entity"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ unique: true })
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}