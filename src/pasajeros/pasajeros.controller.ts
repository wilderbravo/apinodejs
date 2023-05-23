import { PasajerosService } from './pasajeros.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseFloatPipe } from 'src/common/parse-float.pipe';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
@ApiTags('pasajeros')
@Controller('pasajeros')
export class PasajerosController {
  constructor(private pasajerosService: PasajerosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los pasajeros' })
  getPasajeros() {
    return this.pasajerosService.obtenerPasajeros();
  }

  @Get(':pasajeroId')
  @ApiOperation({ summary: 'Lista de pasajeros filtrado por ID' })
  getConductorPorId(@Param('pasajeroId', ParseIntPipe) pasajeroId: number) {
    return this.pasajerosService.obtenerPasajeroPorId(pasajeroId);
  }

  @Get(':pasajeroId/conductores')
  @ApiOperation({ summary: 'Lista los 3 conductores más cerca del pasajero' })
  async getConductoresCercanos(
    @Param('pasajeroId', ParseIntPipe) pasajeroId: number,
    @Query('latitud', ParseFloatPipe) latitud,
    @Query('longitud', ParseFloatPipe) longitud,
  ) {
    return await this.pasajerosService.obtenerTresPasajerosMasCerca(
      latitud,
      longitud,
      pasajeroId
    );
  }

  // No envisr fecha, se crea por dentro
  // La factura también por ID
  // Agregar try catch

}
