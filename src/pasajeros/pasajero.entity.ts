import { Viaje } from '../viajes/viaje.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
@Entity({ name: 'pasajeros' })
export class Pasajero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombres: string;

  @Column({ type: 'varchar', length: 150 })
  apellidos: string;

  @Column({ type: 'varchar', length: 15 })
  dni: string;
  
  @CreateDateColumn({
    type: 'timestamptz',
  })
  fechanacimiento: Date;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'float' })
  latitud: number;

  @Column({ type: 'float' })
  longitud: number;

  @Column({ type: 'char', length: 1 })
  estado: string;

  @OneToMany(() => Viaje, (viaje) => viaje.conductor, { eager: true })
  viajes: Viaje[];
}
