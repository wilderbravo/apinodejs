import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajesController } from './viajes.controller';
import { ViajesService } from './viajes.service';
import { Viaje } from './viaje.entity';
import { FacturasModule } from '../facturas/facturas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje]), FacturasModule],
  controllers: [ViajesController],
  providers: [ViajesService],
  exports: [ViajesService],
})
export class ViajesModule {}