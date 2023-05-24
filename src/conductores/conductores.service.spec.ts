// Importar la función que se va a probar
const calcularDistanciaKilometros = require('../conductores/conductores.service');

describe('Pruebas unitarias para los servicios de conductores', () => {
  // Prueba 1
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
    const distanciaCalculada = calcularDistanciaKilometros(
      latitudOrigen,
      longitudOrigen,
      latitudDestino,
      longitudDestino,
    );

    // Verificar que la distancia calculada sea igual a la distancia esperada
    expect(distanciaCalculada).toBe(distanciaEsperada);
  });
});
