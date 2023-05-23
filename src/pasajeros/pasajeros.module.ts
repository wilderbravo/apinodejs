import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasajerosController } from './pasajeros.controller';
import { PasajerosService } from './pasajeros.service';
import { Pasajero } from './pasajero.entity';
import { ConductoresModule } from 'src/conductores/conductores.module';
@Module({
  imports: [TypeOrmModule.forFeature([Pasajero]), ConductoresModule],
  controllers: [PasajerosController],
  providers: [PasajerosService],
  exports: [PasajerosService],
})
export class PasajerosModule {}