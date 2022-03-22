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