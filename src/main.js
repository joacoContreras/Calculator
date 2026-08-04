// main.js
import { calculate , negate, formatResult} from './operations.js';

const calculatorButtons = [
    {text: '%', type: 'action', value: 'percent'},
    {text: 'AC', type: 'action', value: 'absolute-clear'},
    {text: 'C', type: 'action', value: 'clear'},
    {text: '⌫', type: 'action', value: 'backspace'},

    {text: '1/x', type: 'action', value: 'inverse'},
    {text: 'x²', type: 'action', value: 'power'},
    {text: '√x', type: 'action', value: 'sqrt'},
    {text: '÷', type: 'operator', value: '/'},

    { text: '7', type: 'number', value: '7' },
    { text: '8', type: 'number', value: '8' },
    { text: '9', type: 'number', value: '9' },
    {text: 'x', type: 'operator', value: '*'},

    { text: '4', type: 'number', value: '4' },
    { text: '5', type: 'number', value: '5' },
    { text: '6', type: 'number', value: '6' },
    {text: '-', type: 'operator', value: '-'},

    { text: '1', type: 'number', value: '1' },
    { text: '2', type: 'number', value: '2' },
    { text: '3', type: 'number', value: '3' },
    {text: '+', type: 'operator', value: '+'},

    {text: '+/-', type: 'action', value: 'negate'},
    { text: '0', type: 'number', value: '0' },
    { text: '.', type: 'number', value: '.' },
    {text: '=', type: 'equals', value: '='}
];

// 1. Seleccionamos el contenedor padre en el DOM
const keysContainer = document.querySelector('#keys-container');

// 2. Funcion para renderizar todos los botones
function createCalculatorKeys() {
    calculatorButtons.forEach(btnInfo => {
        //a. Crear el elemento html
        const button = document.createElement('button');

        // b. Asignar el texto visible
        button.textContent = btnInfo.text;
        
        // c. Asignar clases para CSS
        button.classList.add('key', `key--${btnInfo.type}`);

        // d. Guardar metadatos usando data attributes
        button.dataset.type = btnInfo.type; // Se genera: data-type= "..."
        button.dataset.value = btnInfo.value; // Se genera: data-value= "..."

        // e. Insertar el boton en el contenedor padre
        keysContainer.appendChild(button);
    })
}

createCalculatorKeys();

// Agregamos un solo listener para todos los clics
keysContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;

    // Validacion: Si el usuario hace click sobre espacio vacio/hueco entre botones,
    // el target sera el div contenedor y no un boton.
    if(clickedElement.tagName !== 'BUTTON') {
        return;
    }

    // Extraemos los metadatos que le guardamos con data-* 
    const type = clickedElement.dataset.type;
    const value = clickedElement.dataset.value;

    // Derivamos la accion segun el tipo de botom
    handleInput(type, value);
});

// Variables de Estado
let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetDisplay = false;
let shouldStartNewCalculation = false;

function resetCalculationState() {
  firstNumber = '';
  operator = '';
  secondNumber = '';
}

const display = document.querySelector('#display');
function updateDisplay(text) {
  if(typeof text === 'number') {
    display.textContent = formatResult(text);
  } else {
    display.textContent = text;
  }
}

function handleInput(type, value) {
  switch (type) {
    case 'number':
      if (shouldStartNewCalculation) {
        resetCalculationState();

        if (value === '.') {
          updateDisplay('0.');
        } else {
          updateDisplay(value);
        }

        shouldStartNewCalculation = false;
        shouldResetDisplay = false;
        break;
      }
      
      if (value === '.' && display.textContent.includes('.')) return;

      if (display.textContent === '0' || shouldResetDisplay) {
        updateDisplay(value);
        shouldResetDisplay = false;
      } else {
        updateDisplay(display.textContent + value);
      }
      break;

    case 'operator':
      if (shouldStartNewCalculation) {
        firstNumber = display.textContent;
        operator = value;
        shouldStartNewCalculation = false;
        shouldResetDisplay = true;
        break;
      }

      if (shouldResetDisplay) {
        operator = value;
        break;
      }

      if (firstNumber !== '' && operator !== '') {
        secondNumber = display.textContent;
        const result = calculate(Number(firstNumber), Number(secondNumber), operator);
        updateDisplay(result);
        firstNumber = String(result);
      } else {
        firstNumber = display.textContent;
      }

      operator = value;
      shouldResetDisplay = true;      
      break;

    case 'equals':
      if (firstNumber === '') {
        return;
      }
      secondNumber = display.textContent;
      const result = calculate(Number(firstNumber), Number(secondNumber), operator);
      updateDisplay(result);
      shouldResetDisplay = true;
      shouldStartNewCalculation = true;
      break;

    case 'action':

      if (value === 'negate') {
        const currentValue = display.textContent;
        const result = negate(Number(currentValue));
        updateDisplay(result);

      } else if (value === 'absolute-clear') {
        resetCalculationState();
        shouldResetDisplay = true;
        updateDisplay('0');
      
      } else if (value === 'clear') {
        secondNumber = '';
        updateDisplay('0');

      
      } else if (value === 'percent') {
          if (display.textContent === '0') return;
          
          const currentValue = Number(display.textContent);
          const result = (Number(firstNumber) * currentValue)/100;

          secondNumber = String(result);
          updateDisplay(secondNumber);
          shouldResetDisplay = true;
        
        } else if (value === 'backspace') {
          if(display.textContent === '0') return;

          const currentValue = display.textContent.slice(0, -1);
          updateDisplay(currentValue || '0');
        
        } else if (value === 'inverse') {
          if (display.textContent === '0') return;

          const currentValue = Number(display.textContent);
          const result = currentValue ** (-1);
          updateDisplay(result);
          shouldResetDisplay = true;
        
        } else if (value === 'power') {
          if (display.textContent === '0') return;

          const currentValue = Number(display.textContent);
          const result = currentValue ** (2);
          updateDisplay(result);
          shouldResetDisplay = true;
        
        } else if (value === 'sqrt') {
          if (display.textContent === '0') return;

          const currentValue = Number(display.textContent);
          const result = currentValue ** (1/2);
          updateDisplay(result);
          shouldResetDisplay = true;
        }

        break;

      default:
        console.warn('Tipo de botón no reconocido');
  }
}

// Soporte de teclado:
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Números y punto
  if ((key >= '0' && key <= '9') || key === '.') {
    e.preventDefault();
    handleInput('number', key);
    return;
  }

  // Operadores comunes
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    e.preventDefault();
    handleInput('operator', key);
    return;
  }

  // Enter o =
  if (key === 'Enter' || key === '=') {
    e.preventDefault();
    handleInput('equals', '=');
    return;
  }

  // Backspace -> borrar último dígito
  if (key === 'Backspace') {
    e.preventDefault();
    handleInput('action', 'backspace');
    return;
  }

  // Escape o Delete -> AC (limpiar todo)
  if (key === 'Escape' || key === 'Delete') {
    e.preventDefault();
    handleInput('action', 'absolute-clear');
    return;
  }

  // Porcentaje
  if (key === '%') {
    e.preventDefault();
    handleInput('action', 'percent');
    return;
  }

  // Negar (±) — uso de la tecla 'n' como atajo
  if (key === 'n' || key === 'N') {
    e.preventDefault();
    handleInput('action', 'negate');
    return;
  }
});