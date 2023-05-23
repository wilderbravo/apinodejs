import { FacturasService } from './facturas.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('facturas')
@Controller('facturas')
export class FacturasController {
  constructor(private facturaService: FacturasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los pasajeros' })
  getFacturas() {
    return this.facturaService.obtenerFacturas();
  }
}
