// main.js

const calculatorButtons = [
    {text: 'AC', type: 'action', value: 'clear'},
    {text: '+/-', type: 'action', value: 'negate'},
    {text: '%', type: 'action', value: 'percent'},
    {text: '÷', type: 'operator', value: '/'},
    {text: 'x', type: 'operator', value: '*'},
    {text: '-', type: 'operator', value: '-'},
    {text: '=', type: 'equals', value: '='},

    { text: '9', type: 'number', value: '9' },
    { text: '8', type: 'number', value: '8' },
    { text: '7', type: 'number', value: '7' },
    
    { text: '6', type: 'number', value: '6' },
    { text: '5', type: 'number', value: '5' },
    { text: '4', type: 'number', value: '4' },
    
    { text: '3', type: 'number', value: '3' },
    { text: '2', type: 'number', value: '2' },
    { text: '1', type: 'number', value: '1' },
    
    { text: '0', type: 'number', value: '0' },
    { text: '.', type: 'number', value: '.' }

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
        button.classList.add('key', 'key--${btnInfo.type}');

        // d. Guardar metadatos usando data attributes
        button.dataset.type = btnInfo.type; // Se genera: data-type= "..."
        button.dataset.value = btnInfo.value; // Se genera: data-value= "..."

        // e. Insertar el boton en el contenedor padre
        keysContainer.appendChild(button);
    })
}

createCalculatorKeys();