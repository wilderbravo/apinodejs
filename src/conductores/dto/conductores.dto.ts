import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CrearConductorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Nombre del conductor` })
  readonly nombres: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Apellido del conductor` })
  readonly apellidos: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Latitud actual del conductor` })
  readonly latitud: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `Longitud actual del conductor` })
  readonly longitud: number;

  @IsNotEmpty()
  @ApiProperty({ description: `Estado del conductor` })
  readonly estado: string;
}

export class UpdateConductorDto extends PartialType(CrearConductorDto) {}
