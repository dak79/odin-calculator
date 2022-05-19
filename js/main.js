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
};

let digitCounter = 0;
numbers.forEach(number => number.addEventListener('click', populateDisplay));
operators.forEach(operator => operator.addEventListener('click', calculate));

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
* different operators. Float are rounded at 6 digit.
* @param {object} event fired from click listener on calc operator buttons
*/
function calculate(event) {

    // Check if it is the first input
    if (!calculation.firstNumber || !calculation.secondNumber) {

        // Check if it is the first operand or the second
        if (!calculation.isTheSecondNumber) {
            calculation.firstNumber = Number(display.innerText);

            // Check if it is an integer or float
            if (!Number.isInteger(calculation.firstNumber)) {
                parseFloat(calculation.firstNumber.toFixed(6));
            }

            calculation.isTheSecondNumber = true;
            calculation.operator = event.target.dataset.operator;

            // Reset Display
            digitCounter = 0;

            // Equal pressed
            if (calculation.operator === '=') {
                equalButton();
            }

        } else {
            calculation.secondNumber = Number(display.innerText);
            callOperate(event);
        }

    // From the third input...
    } else {
        calculation.firstNumber = Number(calculation.result);

        // Check if the first number is an integer or float.
        if (!Number.isInteger(calculation.firstNumber)) {
            parseFloat(calculation.firstNumber.toFixed(6));
        }

        calculation.secondNumber = Number(display.innerText);
        callOperate(event);
     }
}

/**
* Necessary check before calculate calls operate: those are applied from the
* second user input
* @param {object} event fired from click listener on calc operator buttons
*/
function callOperate(event) {

    // Check if the number is an integer or float
    if (!Number.isInteger(calculation.secondNumber)) {
        parseFloat(calculation.secondNumber.toFixed(6));
    }

    // Check if we have the necessary parameters for calling operate
    if (calculation.operator && calculation.firstNumber && calculation.secondNumber) {

        calculation.result = Number(operate(calculation.operator, calculation.firstNumber, calculation.secondNumber));

        // Check if the result is an integer or float and display it.
        if (Number.isInteger(calculation.result)) {
            display.innerText = calculation.result;

        } else {
            display.innerText = parseFloat(calculation.result.toFixed(6));
        }
    }

    calculation.isTheSecondNumber = false;

    // Check if the operator is the same or will change
    if (calculation.operator !== event.target.dataset.operator) {
        calculation.operator = event.target.dataset.operator;
    }

    // Equal button pressed
    if (calculation.operator === '=') {
        equalButton();
    }

    // Reset display
    digitCounter = 0;
}

/**
* Equality "=" button functionality
*/
function equalButton(){
    calculation.operator = '';
    calculation.firstNumber = null;
    calculation.isTheSecondNumber = false;
    calculation.secondNumber = null;
}
