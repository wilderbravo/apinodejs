// import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 import

// @Global()
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({ // 👈 use TypeOrmModule
//       inject: [config.KEY],
//       useFactory: (configService: ConfigType<typeof config>) => {
//         const { user, host, dbName, password, port } = configService.postgres;
//         return {
//           type: 'postgres',
//           host,
//           port,
//           username: user,
//           password,
//           database: dbName,
//         };
//       },
//     }),
//   ],
//   ...
//   exports: ['API_KEY', 'PG', TypeOrmModule], // 👈 add in exports
// })
// export class DatabaseModule {}