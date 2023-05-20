import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConductoresController } from './controllers/conductores/conductores.controller';
import { ViajesController } from './controllers/viajes/viajes.controller';
import { PasajerosController } from './controllers/pasajeros/pasajeros.controller';
import { FacturasController } from './controllers/facturas/facturas.controller';

@Module({
  imports: [],
  controllers: [AppController, ConductoresController, ViajesController, PasajerosController, FacturasController],
  providers: [AppService],
})
export class AppModule {}
