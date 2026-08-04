# Calculator

Calculadora web simple construida con HTML, CSS y JavaScript puro.

## Descripcion

Este proyecto muestra una calculadora en pantalla con operaciones basicas y varias funciones extra. La interfaz se renderiza en el navegador y toda la logica vive en `src/main.js` y `src/operations.js`.

## Funcionalidades

- Suma, resta, multiplicacion y division.
- Porcentaje.
- Negacion de signo.
- Inverso, potencia al cuadrado y raiz cuadrada.
- Borrado completo y borrado parcial.
- Soporte para secuencias de operaciones y para comenzar un calculo nuevo despues de `=`.

## Uso

1. Abrir `index.html` en un navegador.
2. Ingresar numeros con el teclado en pantalla.
3. Seleccionar una operacion.
4. Ingresar el segundo valor y presionar `=` para ver el resultado.

## Estructura

- `index.html`: contenedor principal de la calculadora.
- `css/style.css`: estilos de la interfaz.
- `src/main.js`: manejo de eventos, estado y render de botones.
- `src/operations.js`: funciones de calculo y formateo del resultado.

## Notas

- No requiere instalacion de dependencias ni proceso de build.
- El proyecto esta pensado para ejecutarse directamente como una pagina estatica.

## Captura de Pantalla

(./images/cap_app.png)
