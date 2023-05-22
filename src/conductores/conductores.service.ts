import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conductor } from './conductor.entity';
// import { CreateCompetitionInput } from './dto/create-competition.input';

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
          3,
        )
      ) {
        conductoresHabilitados.push(value);
      }
    });
    return conductoresHabilitados;
  }

  private calcularDistanciaKilometros(
    latitudOrigen,
    longitudOrigen,
    latitudDestino,
    longitudDestino,
    distanciaMinima,
  ) {
    const potenciaLatitud = Math.pow(latitudDestino - latitudOrigen, 2);
    const potenciaLongitud = Math.pow(longitudDestino - longitudOrigen, 2);
    const raiz = Math.sqrt(potenciaLatitud + potenciaLongitud);
    const distancia = raiz * 100;

    return distancia <= distanciaMinima ? true : false;
  }
}
