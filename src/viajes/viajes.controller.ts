import { ViajesService } from './viajes.service';
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActualizarViajeDto, CrearViajeDto } from './dtos/viajes.dto';
@ApiTags('viajes')
@Controller('viajes')
export class ViajesController {
  constructor(private viajesService: ViajesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los viajes' })
  getViajes() {
    return this.viajesService.obtenerViajes();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Lista de viajes activos' })
  getViajesActivos() {
    return this.viajesService.obtenerViajesActivos();
  }

  @Post('nuevo')
  @ApiOperation({ summary: 'Crear un viaje' })
  postViaje(@Body() payload: CrearViajeDto) {
    return this.viajesService.crearViaje(payload);
  }

  @Put(':viajeId/completar')
  putViaje(
    @Param('viajeId') viajeId: number,
    @Body() payload: ActualizarViajeDto,
  ) {
    return this.viajesService.completarViaje(viajeId, payload);
  }

}
