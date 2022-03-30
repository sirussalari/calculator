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
const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const clear = document.querySelector('#clear');
const leftSemiCircle = document.querySelector('#leftSemiCircle');
const rightSemiCircle = document.querySelector('#rightSemiCircle');
const zeroButton = document.querySelector('#zero');
const positiveNegative = document.querySelector('#positiveNegative');
const percent = document.querySelector('#percent');
const displayStyle = window.getComputedStyle(display);
const zeroButtonElements = [leftSemiCircle, rightSemiCircle, zeroButton];
const maxDigits = 11;
let displayValue = '0';
display.textContent = displayValue;
let firstNumber = null;
let secondNumber = null;
let operatorChoice = null;
let reset = false;
let init = true;
let firstNumberChosen = false;
let negative = false;

for (let digit of digits) {
    digit.addEventListener('click', () => {
        const displayWidth = parseFloat(displayStyle.getPropertyValue('width'));
        if (displayWidth > 300) {
            display.style.fontSize = '50px';
        }
        clear.textContent = 'C';
        for (let operator of operators) {
            operator.style.color = 'white';
            operator.style.backgroundColor = 'orange';
            operator.style.borderColor = 'orange';
        }
        if (reset || firstNumberChosen || init || negative) {
            display.style.fontSize = '60px';
            if (digit.textContent === '.') {
                displayValue  = '0.'
            }
            else {
                displayValue = digit.textContent;
            }
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
            if (negative) {
                displayValue = '-' + displayValue;
                display.textContent = displayValue;
                negative = false;
            }
        }
        else {
            if (displayValue.length < maxDigits) {
                if (digit.textContent !== '.') {
                    displayValue += digit.textContent;
                    display.textContent = displayValue;
                }
                else {
                    if (!displayValue.includes('.')) {
                        displayValue += '.';
                        display.textContent = displayValue;
                    }
                }
            }
        }
    })
}

for (let operator of operators) {
    operator.addEventListener('click', () => {
        for (let operator of operators) {
            operator.style.color = 'white';
            operator.style.backgroundColor = 'orange';
            operator.style.borderColor = 'orange';
        }
        if (operator.classList.contains('equals')) {
            if (firstNumber !== null) {
                secondNumber = parseFloat(displayValue);
                displayValue = operate(firstNumber, operatorChoice, secondNumber);
                if (operatorChoice === 'divide' && secondNumber === 0) {
                    display.textContent = 'ERROR'
                }
                else {
                    const amtChars = displayValue.toString().length;
                    if (amtChars > maxDigits) {
                        if (parseFloat(displayValue) !== parseInt(displayValue)) {
                            let roundedNum = '';
                            displayValue = displayValue.toString();
                            for (let i = 0; i < maxDigits; i++) {
                                roundedNum += displayValue[i];
                            }
                            displayValue = roundedNum;
                            display.textContent = displayValue;
                            display.style.fontSize = '50px';
                        }
                        else {
                            let expNotation = displayValue.toExponential();
                            console.log(expNotation)
                            let fractionDigits = 5;
                            if (expNotation.length > 10) {
                                while (expNotation.length > 10) {
                                    expNotation = displayValue.toExponential(fractionDigits);
                                    fractionDigits -= 1;
                                }
                            }
                            displayValue = expNotation;
                            display.textContent = displayValue;
                            display.style.fontSize = '50px';
                        }
                    }
                    else {
                        display.textContent = displayValue;
                    }
                }
                firstNumber = null;
                operatorChoice = '';
                secondNumber = null;
                reset = true;
                firstNumberChosen = false;
            }
        }
        else {
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
                    const amtChars = displayValue.toString().length;
                    if (amtChars > maxDigits) {
                        if (parseFloat(displayValue) !== parseInt(displayValue)) {
                            let roundedNum = '';
                            displayValue = displayValue.toString();
                            for (let i = 0; i < maxDigits; i++) {
                                roundedNum += displayValue[i];
                            }
                            displayValue = roundedNum;
                            display.textContent = displayValue;
                            display.style.fontSize = '50px';
                        }
                        else {
                            let expNotation = displayValue.toExponential();
                            let fractionDigits = 5;
                            if (expNotation.length > 10) {
                                while (expNotation.length > 10) {
                                    expNotation = displayValue.toExponential(fractionDigits);
                                    fractionDigits -= 1;
                                }
                            }
                            displayValue = expNotation;
                            display.textContent = displayValue;
                            display.style.fontSize = '50px';
                        }
                    }
                    else {
                        display.textContent = displayValue;
                    }
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

zeroButtonElements.forEach(element => {
    element.addEventListener('click', () => {
        const displayWidth = parseFloat(displayStyle.getPropertyValue('width'));
        if (displayWidth > 300) {
            display.style.fontSize = '50px';
        }
        if (firstNumberChosen || init) {
            displayValue = '0';
        }
        else {
            displayValue += '0';
        }
        display.textContent = displayValue;
    })
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

positiveNegative.addEventListener('click', () => {
    if (operatorChoice) {
        if (!firstNumberChosen) {
            displayValue *= -1;
            displayValue = displayValue.toString();
            display.textContent = displayValue;
        }
        else {
            displayValue = '-0';
            display.textContent = displayValue;
            negative = true;
        }
    }
    else {
        displayValue *= -1;
        displayValue = displayValue.toString();
        display.textContent = displayValue;
    }
})

percent.addEventListener('click', () => {
    displayValue /= 100;
    displayValue = displayValue.toString();
    display.textContent = displayValue;
})