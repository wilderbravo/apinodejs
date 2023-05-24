import { ConductoresService } from './conductores.service';
import { ParseIntPipe } from '../common/parse-int.pipe';
import {
  Controller,
  Get,
  Post,
  Param,
  ParseFloatPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('conductores')
@Controller('conductores')
export class ConductoresController {
  constructor(private conductoresService: ConductoresService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de todos los conductores' })
  getConductores() {
    return this.conductoresService.obtenerConductores();
  }

  @Get('disponibles')
  @ApiOperation({ summary: 'Lista de conductores disponibles para un viaje' })
  getConductoresDisponibles() {
    return this.conductoresService.obtenerConductoresDisponibles();
  }

  @Post('disponibles')
  @ApiOperation({
    summary: 'Lista de conductores ubicados a un rango de 3 kilómetros',
  })
  async getDatos(
    @Query('latitud', ParseFloatPipe) latitud: 100,
    @Query('longitud', ParseFloatPipe) longitud: 100,
  ) {
    return await this.conductoresService.obtenerConductoresDisponiblesNKilometros(
      latitud,
      longitud,
      3
    );
  }

  @Get(':conductorId')
  @ApiOperation({ summary: 'Lista de conductores filtrado por ID' })
  getConductorPorId(@Param('conductorId', ParseIntPipe) conductorId: number) {
    return this.conductoresService.obtenerConductorPorId(conductorId);
  }
}
