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
    private conductorService: ConductoresService,
  ) {}

  obtenerPasajeros(): Promise<Pasajero[]> {
    const pasajeros = this.pasajeroRepository.find();
    if (!pasajeros) {
      throw new NotFoundException(`Pasajeros no encontrados`);
    }
    return pasajeros;
  }

  obtenerPasajeroPorId(id: number) {
    const pasajero = this.pasajeroRepository.findOneBy({ id: id });
    if (!pasajero) {
      throw new NotFoundException(`Pasajero con id ${id} no encontrado`);
    }
    return pasajero;
  }

  obtenerTresConductoresMasCerca(latitud: number, longitud: number) {
    const tresConductores = this.conductorService.obtenerConductoresCercanos(
      latitud,
      longitud,
    );
    if (!tresConductores) {
      throw new NotFoundException(`Pasajeros no encontrados`);
    }
    return tresConductores;
  }
}
