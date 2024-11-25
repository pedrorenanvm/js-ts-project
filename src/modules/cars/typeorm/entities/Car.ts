import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum CarStatus {
  ACTIVE = "ativo",
  INACTIVE = "inativo",
  DELETED = "excluído",
}

@Entity("cars")
class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  license_plate: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column("int")
  km: number;

  @Column("int")
  year: number;

  @Column("text", { array: true })
  items: string[];

  @Column("decimal")
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: "enum",
    enum: CarStatus,
    default: CarStatus.ACTIVE,
  })
  status: CarStatus;
}

export default Car;
