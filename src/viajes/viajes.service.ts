import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viaje } from './viaje.entity';
import { ActualizarViajeDto, CrearViajeDto } from './dtos/viajes.dto';
import { FacturasService } from '../facturas/facturas.service';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    private facturaService: FacturasService,
  ) {}

  obtenerViajes(): Promise<Viaje[]> {
    const viajes = this.viajeRepository.find();
    if (!viajes) {
      throw new NotFoundException(`Viajes no encontrados`);
    }

    return viajes;
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
    try {
      const nuevoViaje = this.viajeRepository.create(data);
      return this.viajeRepository.save(nuevoViaje);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Existen problemas para guardar la información',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async completarViaje(viajeId: number, cambios: ActualizarViajeDto) {
    try {
      const viaje = await this.viajeRepository.findOneBy({ id: viajeId });
      this.viajeRepository.merge(viaje, cambios);
      const viajeRegistrado = await this.viajeRepository.save(viaje);
      if (viajeRegistrado) {
        this.facturaService.crearFactura(
          viajeRegistrado.id,
          viajeRegistrado.total,
        );
        return viajeRegistrado;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Existen problemas para guardar la información',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
