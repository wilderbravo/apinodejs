import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CrearViajeDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Fecha de Registro del viaje' })
  readonly fecharegistro: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Latitud origen del viaje' })
  readonly latitudorigen: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Latitud destino del viaje' })
  readonly latitudestino: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Longitud origen del viaje' })
  readonly longitudorigen: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Longitud destino del viaje' })
  readonly longituddestino: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Costo por kilómetro del viaje' })
  readonly costokm: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Total del valor a pagar por el viaje' })
  readonly total: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Estado del viaje' })
  readonly estado: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id del Conductor' })
  readonly conductorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id del Pasajero' })
  readonly pasajeroId: number;
}

export class ActualizarViajeDto extends PartialType(CrearViajeDto) {}
