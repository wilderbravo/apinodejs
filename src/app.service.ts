import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSaludos(): string {
    return 'Bienvenido al API de Taxi24!';
  }
}
