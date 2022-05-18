/**
* Addition
* @param {number} a first addend
* @param {number} b second addend
* @return {number} sum
*/
function add(a, b) {
    return a + b;
}

/**
* Subtraction
* @param {number} a minuend
* @param {number} b subtrahend
* @return {number} difference
*/
function substract(a, b) {
    return a - b;
}

/**
* Moltiplication
* @param {number} a first factor
* @param {number} b second factor
* @return {number} product
*/
function multiply(a, b) {
    return a * b;
}

/**
* Division
* @param {number} a dividend
* @param {number} b divisor
* @return  {number} quotient
*/
function divide(a, b) {
    return a / b;
}

/**
* Operate
* @param {string} operator operator
* @param {number} num1 first number
* @param {number} num2 second number
* @return {number} result from chosen operator
*/
function operate(operator, num1, num2) {

    switch (operator) {
        case '+':
        return add(num1, num2);

        case '-':
        return substract(num1, num2);

        case '*':
        return multiply(num1, num2);

        case '/':
        return divide(num1, num2);
    }
}

const numbers = document.querySelectorAll('.num');
const display = document.querySelector('#display1');
const operators = document.querySelectorAll('.op');
const calculation = {
    firstNumber: null,
    isTheSecondNumber: false,
    secondNumber: null,
    result: null,
    operator: ''
}
let digitCounter = 0;
numbers.forEach(number => number.addEventListener('click', populateDisplay));
operators.forEach(operator => operator.addEventListener('click', calculate))


/**
* Display the number typed on calc pad and store it in a variable. Compute the
* the number of digit for reset calculator screen at the first digit.
* @param {object} event fired from click listener on calc number's buttons
*/
function populateDisplay(event) {
    if (digitCounter === 0) {
        display.innerText = '';
    }
    display.innerText += event.target.dataset.number;
    digitCounter = digitCounter + 1;
}

/**
* Compute calculation form user's input. Chain calculations possible even with
* different operators
* @param {object} event fired from click listener on calc operator buttons
*/
function calculate(event) {
    // Check if it is the first input
    if (calculation.firstNumber === null || calculation.secondNumber === null) {

        // Check if it is the first operand or the second
        if (!calculation.isTheSecondNumber) {
            calculation.firstNumber = parseInt(display.innerText);
            calculation.isTheSecondNumber = true;
            calculation.operator = event.target.dataset.operator;
            digitCounter = 0;

        } else {
            calculation.secondNumber = parseInt(display.innerText);
            calculation.result = parseInt(operate(calculation.operator, calculation.firstNumber, calculation.secondNumber));
            display.innerText = calculation.result;
            calculation.isTheSecondNumber = false;

            // Check if the operator is the same or will change
            if (calculation.operator === event.target.dataset.operator) {
            } else {
                calculation.operator = event.target.dataset.operator;
            }

            digitCounter = 0;
        }

    // From the third input...
    } else {
        calculation.firstNumber = calculation.result;
        calculation.secondNumber = parseInt(display.innerText);
        calculation.result = parseInt(operate(calculation.operator, calculation.firstNumber, calculation.secondNumber));
        display.innerText = calculation.result;

        // Check if operator changed
        if (calculation.operator === event.target.dataset.operator) {
        } else {
            calculation.operator = event.target.dataset.operator;
        }

        digitCounter = 0;
    }


}
