import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductoresModule } from './conductores/conductores.module';
import { ViajesModule } from './viajes/viajes.module'
import { PasajerosModule } from './pasajeros/pasajeros.module';
import { FacturasModule } from './facturas/facturas.module';
@Module({
  imports: [
    ConductoresModule,
    ViajesModule,
    PasajerosModule,
    FacturasModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'qikuser',
      password: '123456',
      database: 'taxi24',
      // entities: [],
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
