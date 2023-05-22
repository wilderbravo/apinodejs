import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { Conductor } from '../conductores/conductor.entity';
import { Pasajero } from '../pasajeros/pasajero.entity';
import { Factura } from 'src/facturas/factura.entity';
@Entity({ name: 'viajes' })
export class Viaje {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecharegistro: Date;

  @Column({ type: 'float' })
  latitudorigen: number;

  @Column({ type: 'float' })
  latitudestino: number;

  @Column({ type: 'float' })
  longitudorigen: number;

  @Column({ type: 'float' })
  longituddestino: number;

  @Column({ type: 'float' })
  costokm: number;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Conductor, (conductor) => conductor.viajes)
  conductor: Conductor[];

  @ManyToOne(() => Pasajero, (pasajero) => pasajero.viajes)
  pasajero: Pasajero[];

  @OneToMany(() => Factura, (factura) => factura.viaje, { eager: true })
  facturas: Factura[];

}