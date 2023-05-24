import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
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

  crearFactura(viajeId: number, total: number) {
    try {
      const fechaActual = new Date();
      const [descuento, impuesto, subtotal, totalPagar] =
        this.calcuarValoresFactura(total);
      const factura = {
        fecharegistro: fechaActual,
        descripcion: 'Servicio de Transporte',
        valorimpuesto: impuesto,
        descuento: descuento,
        subtotal: subtotal,
        total: totalPagar,
        viajeId: viajeId,
      };
      const dtoFactura = this.pasarDTOFactura(factura);
      const nuevaFactura = this.facturaRepository.create(dtoFactura);
      return this.facturaRepository.save(nuevaFactura);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Existen problemas al guardar la información',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  calcuarValoresFactura(subtotal: number) {
    const porcentaje_impuesto = parseFloat(process.env.IMPUESTO);
    const porcentaje_descuento = parseFloat(process.env.DESCUENTO);
    const valor_descuento = subtotal * porcentaje_descuento;
    const valor_antes_impuesto = subtotal - valor_descuento;
    const valor_impuesto = valor_antes_impuesto * porcentaje_impuesto;

    return [
      valor_descuento,
      valor_impuesto,
      valor_antes_impuesto,
      valor_antes_impuesto + valor_impuesto,
    ];
  }

  pasarDTOFactura(data: CrearFacturaDto) {
    return data;
  }
}
