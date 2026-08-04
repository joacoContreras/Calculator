
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
    if( b === 0) {
        return 0;
    } else {
        return a / b;
    }
}

function negate (a) {
    return (-1) * a;
}

function calculate(a, b, operator) {
    if(operator === '+') {
        return add(a, b);
    
    } else if(operator === '-') {
        return subtract(a, b);
    
    } else if (operator === '/') {
        if (b === 0) {
            return "Can't divide by zero";
        } else {
            return divide(a, b);
        }

    } else if (operator === '*') {
        return multiply(a , b);
    
    }
}

function formatResult(value) {
    if (!Number.isFinite(value)) return 'Error';

    const rounded = Number(value.toPrecision(12));
    return String(rounded);
}

export { calculate , negate , formatResult };
