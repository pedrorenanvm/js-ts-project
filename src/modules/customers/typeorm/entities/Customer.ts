import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("customers")
class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ type: "date" })
    dateOfBirth: Date;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}

export default Customer;
