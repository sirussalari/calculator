function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    if (operator === 'add') {
        return add(x, y);
    }
    else if (operator === 'subtract') {
        return subtract(x, y);
    }
    else if (operator === 'multiply') {
        return multiply(x, y);
    }
    else if (operator === 'divide') {
        return divide(x, y);
    }
}

const display = document.querySelector('#display');
const digits = document.querySelector('#digits').children;
const operators = document.querySelector('#operators').children;
const clear = document.querySelector('#clear');
let displayValue = '0';
display.textContent = displayValue;
let firstNumber = null;
let secondNumber = null;
let operatorChoice = null;
let reset = false;
let init = true;

for (let digit of digits) {
    digit.addEventListener('click', () => {
        if (reset) {
            displayValue = '';
            display.textContent = displayValue;
            reset = false;
        }
        if (firstNumber == displayValue || init) {
            displayValue = digit.textContent;
            display.textContent = displayValue;
            init = false;

        }
        else {
            displayValue += digit.textContent;
            display.textContent = displayValue;
        }
    })
}

for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (operator.textContent === '=') {
            if (firstNumber !== null) {
                secondNumber = parseFloat(displayValue);
                displayValue = operate(firstNumber, operatorChoice, secondNumber);
                if (operatorChoice === 'divide' && secondNumber === 0) {
                    display.textContent = 'ERROR'
                }
                else {
                    display.textContent = displayValue;
                }
                firstNumber = null;
                operatorChoice = '';
                secondNumber = null;
                reset = true;
            }
        }
        else {
            if (operatorChoice) {
                secondNumber = parseFloat(displayValue);
                displayValue = operate(firstNumber, operatorChoice, secondNumber);
                if (operatorChoice === 'divide' && secondNumber === 0) {
                    display.textContent = 'ERROR'
                }
                else {
                    display.textContent = displayValue;
                }
            }
            firstNumber = parseFloat(displayValue);
            operatorChoice = operator.textContent;
            if (operator.textContent === '+') {
                operatorChoice = 'add';
            }
            else if (operator.textContent === '-') {
                operatorChoice = 'subtract';
            }
            else if (operator.textContent === '*') {
                operatorChoice = 'multiply'
            }
            else if (operator.textContent === '/') {
                operatorChoice = 'divide';
            }
        }
    })
}

clear.addEventListener('click', () => {
    displayValue = '0';
    display.textContent = displayValue;
    firstNumber = null;
    secondNumber = null;
    operatorChoice = null;
    reset = false;
    init = true;
})