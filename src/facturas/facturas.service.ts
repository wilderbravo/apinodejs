import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './factura.entity';
import { CrearFacturaDto } from './dto/facturas.dto';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
  ) {}

  obtenerFacturas() {
    return this.facturaRepository.find();
  }

  crearFactura(viajeId: number) {
    const fechaActual = new Date();
    const factura = {
      fecharegistro: fechaActual,
      descripcion: 'Servicio de Transporte',
      valorimpuesto: 0.12,
      descuento: 0.0594,
      subtotal: 1.926,
      total: 2.1906,
      viajeId: viajeId,
    };
    const dtoFactura = this.pasarDTOFactura(factura);
    const nuevaFactura = this.facturaRepository.create(dtoFactura);
    return this.facturaRepository.save(nuevaFactura);
  }

  pasarDTOFactura(data: CrearFacturaDto) {
    return data;
  }
}
