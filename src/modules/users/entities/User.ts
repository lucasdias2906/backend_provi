import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    // CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    full_name: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    cpf: string;

    @Column({ nullable: true })
    birthday: string;

    @Column({ nullable: true })
    phone: number;

    @Column({ nullable: true })
    cep: string;

    @Column({ nullable: true })
    street: string;

    @Column({ nullable: true })
    number_house: number;

    @Column({ nullable: true })
    complement: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true, type: 'float', precision: 10, scale: 6 })
    amount_requested: number;

    @Column({ nullable: true })
    active: boolean;

    @Column('timestamp with time zone')
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
