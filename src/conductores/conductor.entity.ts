import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
// @Entity()
@Entity({ name: 'conductores' })
export class Conductor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombres: string;

  @Column({ type: 'varchar', length: 150 })
  apellidos: string;

  @Column({ type: 'float' })
  latitud: number;

  @Column({ type: 'float' })
  longitud: number;

  @Column({ type: 'char', length: 1 })
  estado: string;
}
