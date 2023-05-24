// Importar la función que se va a probar
import { ConductoresService } from './conductores.service';
import { Conductor } from './conductor.entity';
import { Repository } from 'typeorm';

describe('Pruebas para conductores', () => {
  let service: ConductoresService;
  let mockConductorRepository: Repository<Conductor>;
  beforeEach(() => {
    mockConductorRepository = {} as Repository<Conductor>;
    service = new ConductoresService(mockConductorRepository);
  });

  it('debe calcular correctamente la distancia en kilómetros', () => {
    // Definir las coordenadas de origen y destino para la prueba
    const latitudOrigen = 18.5361206716888;
    const longitudOrigen = -69.942848478185;
    const latitudDestino = 18.534769855329;
    const longitudDestino = -69.941407771272;

    // Calcular la distancia esperada en kilómetros
    const distanciaEsperada =
      Math.sqrt(
        Math.pow(latitudDestino - latitudOrigen, 2) +
          Math.pow(longitudDestino - longitudOrigen, 2),
      ) * 100;

    // Llamar a la función a probar
    const distanciaCalculada = service.calcularDistanciaKilometros(
      latitudOrigen,
      longitudOrigen,
      latitudDestino,
      longitudDestino,
    );

    // Verificar que la distancia calculada sea igual a la distancia esperada
    expect(distanciaCalculada).toBe(distanciaEsperada);
  });

  it('Debería retornar un conductor, enviando el Id', async () => {
    const mockConductorId = 1;
    const mockConductor = { id: mockConductorId, nombre: 'Conductor 1' };

    // Mockear el comportamiento del conductorRepository.findOneBy
    mockConductorRepository.findOneBy = jest
      .fn()
      .mockResolvedValue(mockConductor);

    // Llamar a la función a probar
    const result = await service.obtenerConductorPorId(mockConductorId);

    // Verificar los resultados
    expect(mockConductorRepository.findOneBy).toHaveBeenCalledWith({
      id: mockConductorId,
    });
    expect(result).toBe(mockConductor);
  });

  it('Debería retornar un array con conductores disponibles', async () => {
    const mockConductoresDisponibles = [
      { id: 1, nombre: 'Conductor 1', apellido: 'De auto' },
      { id: 2, nombre: 'Conductor 2', apellido: 'De auto' },
    ];

    // Mockear el comportamiento del conductorRepository.find
    mockConductorRepository.find = jest
      .fn()
      .mockResolvedValue(mockConductoresDisponibles);

    // Llamar a la función a probar
    const result = await service.obtenerConductoresDisponibles();

    // Verificar los resultados
    expect(mockConductorRepository.find).toHaveBeenCalledWith({
      where: { disponible: true },
    });
    expect(result).toBe(mockConductoresDisponibles);
  });
});
