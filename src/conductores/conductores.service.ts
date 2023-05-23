import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conductor } from './conductor.entity';

@Injectable()
export class ConductoresService {
  constructor(
    @InjectRepository(Conductor)
    private conductorRepository: Repository<Conductor>,
  ) {}
  obtenerConductores(): Promise<Conductor[]> {
    return this.conductorRepository.find();
  }

  obtenerConductorPorId(id: number) {
    const conductor = this.conductorRepository.findOneBy({ id: id }); // findOneById()

    if (!conductor) {
      throw new NotFoundException(`Conductor con id ${id} no encontrado`);
    }

    return conductor;
  }

  obtenerConductoresDisponibles() {
    const conductor = this.conductorRepository.find({
      select: [
        'id',
        'nombres',
        'apellidos',
        'dni',
        'disponible',
        'latitud',
        'longitud',
      ],
      where: {
        disponible: true,
      },
    });

    if (!conductor) {
      throw new NotFoundException(`Conductores disponibles no encontrados`);
    }

    return conductor;
  }

  async obtenerConductoresDisponibles3Kilometros(
    latitud: number,
    longitud: number,
  ) {
    let conductoresHabilitados = [];

    const conductores = await this.conductorRepository.find({
      where: {
        disponible: true,
      },
    });

    Object.entries(conductores).forEach(([key, value]) => {
      if (
        this.calcularDistanciaKilometros(
          latitud,
          longitud,
          value.latitud,
          value.longitud,
        ) <= 3
      ) {
        conductoresHabilitados.push(value);
      }
    });
    if (!conductoresHabilitados) {
      throw new NotFoundException(
        `Conductores disponibles a 3 kilómetros no encontrados`,
      );
    }
    return conductoresHabilitados;
  }

  async obtenerConductoresCercanos(
    latitud: number,
    longitud: number,
    id: number,
  ) {
    let conductoresCercanos = [];
    let tresConductoresCercanos = [];
    const conductores = await this.conductorRepository.find({
      where: {
        disponible: true,
      },
    });
    Object.entries(conductores).forEach(([key, value]) => {
      const distaciaPorConductor = this.calcularDistanciaKilometros(
        latitud,
        longitud,
        value.latitud,
        value.longitud,
      );
      Object.assign(value, { distancia: distaciaPorConductor });
      conductoresCercanos.push(value);
    });

    conductoresCercanos.sort((x, y) => x.distancia - y.distancia);
    tresConductoresCercanos.push(conductoresCercanos[0]);
    tresConductoresCercanos.push(conductoresCercanos[1]);
    tresConductoresCercanos.push(conductoresCercanos[2]);
    return tresConductoresCercanos;
  }

  calcularDistanciaKilometros(
    latitudOrigen,
    longitudOrigen,
    latitudDestino,
    longitudDestino,
  ) {
    const potenciaLatitud = Math.pow(latitudDestino - latitudOrigen, 2);
    const potenciaLongitud = Math.pow(longitudDestino - longitudOrigen, 2);

    return Math.sqrt(potenciaLatitud + potenciaLongitud) * 100;
  }
}
