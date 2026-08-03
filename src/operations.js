export { handleInput } from operation.js;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    if(operator === '+') {
        return add(a, b);
    
    } else if(operator === '-') {
        return subtract(a, b);
    
    } else if (operator === '/') {
        return divide(a, b);
    
    } else if (operator === '*') {
        return multiply(a , b);
    }
}

function handleInput(type, value) {
  switch (type) {
    case 'number':
      console.log(`Es un número o punto: ${value}`);
      // Aquí irá tu función para ir formando los números en pantalla
      break;

    case 'operator':
      console.log(`Es un operador: ${value}`);
      
      break;

    case 'equals':
      console.log('¡Hora de calcular el resultado!');
      // Aquí ejecutarás tu función principal de cálculo u operate()
      break;

    case 'action':
      console.log(`Es una acción especial: ${value}`);
      // Aquí manejarás 'clear' (AC), cambiar signo (+/-), etc.
      break;

    default:
      console.warn('Tipo de botón no reconocido');
  }
}