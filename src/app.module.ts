import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { ConductoresModule } from './conductores/conductores.module';
import { ViajesModule } from './viajes/viajes.module';
import { PasajerosModule } from './pasajeros/pasajeros.module';
import { FacturasModule } from './facturas/facturas.module';
import { DatabaseModule } from './database/database.module';
import config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    ConductoresModule,
    ViajesModule,
    PasajerosModule,
    FacturasModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
