import { Viaje } from '../viajes/viaje.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne
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
  valorimpuesto: number;

  @Column({ type: 'float' })
  descuento: number;

  @Column({ type: 'float' })
  subtotal: number;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Viaje, (viaje) => viaje.facturas)
  viajeId: number;
}
