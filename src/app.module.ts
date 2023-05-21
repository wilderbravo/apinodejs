import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductoresModule } from './conductores/conductores.module';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConductoresController } from './conductores/conductores.controller';

@Module({
  imports: [
    ConductoresModule,
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
