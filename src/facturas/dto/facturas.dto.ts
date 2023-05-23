import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearFacturaDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Fecha de Registro del viaje' })
  readonly fecharegistro: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descripción de la factura' })
  readonly descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Valor del impuesto a la fecha' })
  readonly valorimpuesto: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descuento aplicado a la factura' })
  readonly descuento: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subtotal del valor de la factura' })
  readonly subtotal: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Total del valor de la factura' })
  readonly total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id del Viaje' })
  readonly viajeId: number;
}
