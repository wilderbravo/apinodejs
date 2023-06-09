import { Injectable, NotFoundException } from '@nestjs/common';
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
    const conductores = this.conductorRepository.find();
    if (!conductores) {
      throw new NotFoundException(`Conductores no encontrados`);
    }
    return conductores;
  }

  obtenerConductorPorId(id: number) {
    const conductor = this.conductorRepository.findOneBy({ id: id });
    if (!conductor) {
      throw new NotFoundException(`Conductor con id ${id} no encontrado`);
    }
    return conductor;
  }

  obtenerConductoresDisponibles() {
    const conductores = this.conductorRepository.find({
      where: {
        disponible: true,
      },
    });
    if (!conductores) {
      throw new NotFoundException(`Conductores disponibles no encontrados`);
    }
    return conductores;
  }
  async obtenerConductoresDisponiblesNKilometros(
    latitud: number,
    longitud: number,
    kilometros: number,
  ) {
    const conductoresHabilitados = [];
    const conductores = await this.conductorRepository.find({
      where: {
        disponible: true,
      },
    });
    if (!conductores) {
      throw new NotFoundException(`Conductores disponibles no encontrados`);
    }
    Object.entries(conductores).forEach(([key, value]) => {
      if (
        this.calcularDistanciaKilometros(
          latitud,
          longitud,
          value.latitud,
          value.longitud,
        ) <= kilometros
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

  async obtenerConductoresCercanos(latitud: number, longitud: number) {
    const conductoresCercanos = [];
    const tresConductoresCercanos = [];
    const conductores = await this.conductorRepository.find({
      where: {
        disponible: true,
      },
    });
    if (!conductores) {
      throw new NotFoundException(`Conductores disponibles no encontrados`);
    }
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
