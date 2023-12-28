import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name : 'id'})
    id : string

    @Column({name : 'first_name', nullable : false, })
    firstName : string

    @Column({name : 'last_name', nullable : false, })
    lastName : string

    @Column({name : 'age', nullable : false, })
    age : number

    @Column({name : 'email', nullable : false })
    email : string

    @Column({name : 'is_verified', nullable : false, default : false })
    isVerified : boolean
}