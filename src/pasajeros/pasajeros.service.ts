import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pasajero } from './pasajero.entity';
import { ConductoresService } from '../conductores/conductores.service';

@Injectable()
export class PasajerosService {
  constructor(
    @InjectRepository(Pasajero)
    private pasajeroRepository: Repository<Pasajero>,
    private conductorService: ConductoresService
  ) {}

  obtenerPasajeros(): Promise<Pasajero[]> {
    return this.pasajeroRepository.find();
  }

  obtenerPasajeroPorId(id: number) {
    const pasajero = this.pasajeroRepository.findOneBy({ id: id });
    if (!pasajero) {
      throw new NotFoundException(`Pasajero con id ${id} no encontrado`);
    }
    return pasajero;
  }

  obtenerTresPasajerosMasCerca(latitud: number, longitud: number, id: number) {
    return this.conductorService.obtenerConductoresCercanos(latitud, longitud, id);
    // return "Hola";
  }
}
