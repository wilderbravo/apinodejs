import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
} from 'typeorm';
@Entity({ name: 'facturas' })
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecharegistro: Date;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  @Column({ type: 'float' })
  latitudorigen: number;

  @Column({ type: 'float' })
  impuesto: number;

  @Column({ type: 'float' })
  descuento: number;

  @Column({ type: 'float' })
  subtotal: number;

  @Column({ type: 'float' })
  total: number;
}
