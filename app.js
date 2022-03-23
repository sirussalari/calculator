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
let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let operatorChoice = '';
let reset = false;
let operatorClicked = false;

for (let digit of digits) {
    digit.addEventListener('click', () => {
        if (reset) {
            displayValue = '';
            display.textContent = displayValue;
            reset = false;
        }
        displayValue += digit.textContent;
        display.textContent = displayValue;
        
    })
}

for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (!operatorClicked) {
            firstNumber = parseInt(displayValue);
            operatorChoice = operator.textContent;
            displayValue = '';
            display.textContent = displayValue;
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
            operatorClicked = true;
        }
        else {
            if (operator.textContent === '=') {
                secondNumber = parseInt(displayValue);
                displayValue = operate(firstNumber, operatorChoice, secondNumber);
                display.textContent = displayValue;
                operatorClicked = false;
                firstNumber = null;
                operatorChoice = '';
                secondNumber = null;
                reset = true;
            }
        }
    })
}