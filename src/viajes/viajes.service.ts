import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viaje } from './viaje.entity';
import { ActualizarViajeDto, CrearViajeDto } from './dtos/viajes.dto';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
  ) {}

  obtenerViajes(): Promise<Viaje[]> {
    return this.viajeRepository.find();
  }

  obtenerViajesActivos() {
    const viajes = this.viajeRepository.find({
      where: {
        estado: 'A',
      },
    });

    if (!viajes) {
      throw new NotFoundException(`Viajes activos no encontrados`);
    }

    return viajes;
  }

  crearViaje(data: CrearViajeDto) {
    const nuevoViaje = this.viajeRepository.create(data);
    return this.viajeRepository.save(nuevoViaje);
  }

  async completarViaje(viajeId: number, cambios: ActualizarViajeDto) {
    const viaje = await this.viajeRepository.findOneBy({ id: viajeId });
    this.viajeRepository.merge(viaje, cambios);
    return this.viajeRepository.save(viaje);
  }
}
