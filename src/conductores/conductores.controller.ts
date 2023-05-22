import { ConductoresService } from './conductores.service';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { Controller, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Lista de conductores disponibles' })
  getConductoresDisponibles() {
    return this.conductoresService.obtenerConductoresDisponibles();
  }

  @Get(':conductorId')
  @HttpCode(HttpStatus.ACCEPTED)
  getConductorPorId(@Param('conductorId', ParseIntPipe) conductorId: number) {
    return this.conductoresService.obtenerConductorPorId(conductorId);
  }
}
