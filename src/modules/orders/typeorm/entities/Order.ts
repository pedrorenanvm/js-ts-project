import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import  Customer  from '../../../customers/typeorm/entities/Customer';
import  Car  from '../../../cars/typeorm/entities/Car';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ type: 'timestamp', nullable: true })
  dataInicial: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataFinal: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataCancelamento: Date;

  @Column({ type: 'varchar', length: 8, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cidade: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  uf: string;

  @Column({ type: 'float', default: 0 })
  valorTotal: number;

  @Column({
    type: 'enum',
    enum: ['ABERTO', 'APROVADO', 'CANCELADO'],
    default: 'ABERTO',
  })
  status: 'ABERTO' | 'APROVADO' | 'CANCELADO';
}
