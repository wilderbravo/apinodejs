import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.conductorRepository.find({
      // select: ['nombres', 'apellidos']
    });
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
      where: {
        estado: '1',
      },
    });

    if (!conductor) {
      throw new NotFoundException(`Conductores disponibles no encontrados`);
    }

    return conductor;
  }
}
