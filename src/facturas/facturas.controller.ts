import { Controller, Get } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('facturas')
@Controller('facturas')
export class FacturasController {
  constructor(private facturaService: FacturasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las facturas' })
  getFacturas() {
    return this.facturaService.obtenerFacturas();
  }
}
