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
const decimalButton = document.querySelector('#decimal');
const leftSemiCircle = document.querySelector('#leftSemiCircle');
const rightSemiCircle = document.querySelector('#rightSemiCircle');
const zeroButton = document.querySelector('#zero');
const zeroButtonElements = [leftSemiCircle, rightSemiCircle, zeroButton];
let displayValue = '0';
display.textContent = displayValue;
let firstNumber = null;
let secondNumber = null;
let operatorChoice = null;
let reset = false;
let init = true;
let firstNumberChosen = false;

for (let digit of digits) {
    digit.addEventListener('click', () => {
        clear.textContent = 'C';
        for (let operator of operators) {
            operator.style.color = 'white';
            operator.style.backgroundColor = 'orange';
            operator.style.borderColor = 'orange';
        }
        if (reset || firstNumberChosen || init) {
            displayValue = digit.textContent;
            display.textContent = displayValue;
            if (reset) {
                reset = false;
            }
            if (init) {
                init = false;
            }
            if (firstNumberChosen) {
                firstNumberChosen = false;
            }
        }
        else {
            displayValue += digit.textContent;
            display.textContent = displayValue;
        }
    })
}

for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (operator.classList.contains('equals')) {
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
                firstNumberChosen = false;
            }
        }
        else {
            for (let operator of operators) {
                operator.style.color = 'white';
                operator.style.backgroundColor = 'orange';
                operator.style.borderColor = 'orange';
            }
            operator.style.color = 'orange';
            operator.style.backgroundColor = 'white';
            operator.style.borderColor = 'white';
            if (operatorChoice && !firstNumberChosen) {
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
            firstNumberChosen = true;
            operatorChoice = operator.textContent;
            if (operator.classList.contains('addition')) {
                operatorChoice = 'add';
            }
            else if (operator.classList.contains('subtract')) {
                operatorChoice = 'subtract';
            }
            else if (operator.classList.contains('multiply')) {
                operatorChoice = 'multiply';
            }
            else if (operator.classList.contains('divide')) {
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
    clear.textContent = 'AC';
    for (let operator of operators) {
        operator.style.color = 'white';
        operator.style.backgroundColor = 'orange';
        operator.style.borderColor = 'orange';
    }
})

decimalButton.addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        display.textContent = displayValue;
    }
})

zeroButtonElements.forEach(element => {
    element.addEventListener('mousedown', () => {
        zeroButtonElements.forEach(element => {
            element.style.backgroundColor = 'grey';
            element.style.borderColor = 'grey';
        })
    })
    element.addEventListener('mouseup', () => {
        zeroButtonElements.forEach(element => {
            element.style.backgroundColor = 'rgb(43, 42, 42)';
            element.style.borderColor = 'rgb(43, 42, 42)';
        })
    })
})