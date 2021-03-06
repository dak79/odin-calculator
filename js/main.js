const numbers = document.querySelectorAll('.num');
const display = document.querySelector('#display');
const operators = document.querySelectorAll('.op');
const clearBtn = document.querySelector('#cancel');
const decimalBtn = document.querySelector('#decimal');
const delBtn = document.querySelector('#backspace');
const negativeBtn = document.querySelector('#negative');
const squareRoot = document.querySelector('#squareRoot');

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
clearBtn.addEventListener('click', clear);
delBtn.addEventListener('click', backspace);
negativeBtn.addEventListener('click', negative);
squareRoot.addEventListener('click', root);
document.addEventListener('keydown', keyboardSupport);

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

/**
* Display the number typed on calc pad and store it in a variable. Compute the
* the number of digit for reset calculator screen at the first digit.
* @param {object} event fired from click listener on calc number's buttons
*/
function populateDisplay(event) {
    if (digitCounter === 0) {
        display.innerText = '';
        decimalBtn.disabled = false;
    }

    if (digitCounter < 10) {
        display.innerText += event.target.dataset.number;
        digitCounter += 1;

        // Allowing only one .
        if (event.target.dataset.number === '.') {
            decimalBtn.disabled = true;
        }
    }

    if (calculation.operator === '-') {
        negativeBtn.disabled = true;
    } else {
        negativeBtn.disabled = false;
    }
}

/**
* Compute calculation form user's input. Chain calculations possible even with
* different operators. Float are rounded at 6 digit.
* @param {object} event fired from click listener on calc operator buttons
*/
function calculate(event) {
    // Check if it is the first input
    if (calculation.firstNumber === null || calculation.secondNumber === null) {

        // Check if it is the first operand or the second
        if (!calculation.isTheSecondNumber) {
            calculation.firstNumber = Number(display.innerText);

            // Check if it is an integer or float
            if (!Number.isInteger(calculation.firstNumber)) {
                parseFloat(calculation.firstNumber.toFixed(6));
            }

            calculation.isTheSecondNumber = true;

            // Assign operator according to clicked button
            if (event instanceof MouseEvent) {
                calculation.operator = event.target.dataset.operator;
            }

            // Assign operator according key pressed
            if (event instanceof KeyboardEvent){
                calculation.operator = event.key;
            }

            // Reset Display
            digitCounter = 0;

            // Equal pressed
            if (calculation.operator === '=') {
                equalButton();
            }

        } else {
            calculation.secondNumber = Number(display.innerText);

            // Use the first number if the second is null
            if (isNaN(calculation.secondNumber) || calculation.secondNumber === null) {
                calculation.secondNumber = Number(calculation.firstNumber);
            }

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

        // Use the first number if the second is null
        if (!calculation.secondNumber) {
            calculation.secondNumber = Number(calculation.firstNumber);
        }

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

    calculation.result = Number(operate(calculation.operator, calculation.firstNumber, calculation.secondNumber));
    const resultLength = calculation.result.toString().length;

    // Manage number of digits for display
    if (resultLength > 12) {
        display.innerText = 'Too many digits';
    } else {
        if (isNaN(calculation.result) || calculation.result === null || calculation.result === Infinity) {

            // Division for 0
            if (calculation.secondNumber === 0 && calculation.operator === '/') {
                display.innerText = 'Division for 0'
                equalButton();
                digitCounter = 0;
            } else {
                display.innerText = 'Error';
                equalButton();
                digitCounter = 0;
            }

        } else {

            // Check if the result is an integer or float and display it.
            if (Number.isInteger(calculation.result)) {
                display.innerText = calculation.result;

            } else {
                display.innerText = parseFloat(calculation.result.toFixed(6));
            }
        }
    }

    calculation.isTheSecondNumber = false;

    // Re-assign (eventually) operator from mouse event
    if (event instanceof MouseEvent) {

        // Check if the operator is the same or will change
        if (calculation.operator !== event.target.dataset.operator) {
            calculation.operator = event.target.dataset.operator;
        }
    }

    // Re-assign (eventually) operator for keyboard event
    if (event instanceof KeyboardEvent) {

        // Check if the operator is the same or will change
        if (calculation.operator !== event.key) {
            calculation.operator = event.key;
        }
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
    negativeBtn.disabled = false;
}

/**
* Clear "AC" button functionality
*/
function clear(){
    calculation.firstNumber = null;
    calculation.isTheSecondNumber = false;
    calculation.secondNumber = null;
    calculation.result = null;
    calculation.operator = '';
    display.innerText = 0;
    digitCounter = 0;
    negativeBtn.disabled = false;
    decimalBtn.disabled = false;
}

/**
* Backspace "DEL" button functionality
*/
function backspace() {

    const number = display.innerText;
    const trimmedNumber = number.slice(0, -1);

    display.innerText = trimmedNumber;
    digitCounter -= 1;


    if (!trimmedNumber || number === 'Infinity' || number === 'Use only real numbers' || number === 'Error' || number === 'Too many digits' || number === 'Division for 0') {
        display.innerText = 0;
        digitCounter = 0;
    }
}

/**
* Negative and positive number, "-/+" button functionality
*/
function negative(){
    const number = display.innerText;

    if (number !== '0' && number !== 'Infinity' && number !== 'Use only real numbers' && number !== 'Error' && number !== 'Too many digits' && number !== 'Division for 0') {
        const firstChar = number.slice(0, 1)
        if (firstChar === '-') {
            display.innerText = number.substring(1);

        } else {
            display.innerHTML = `-${display.innerText}`;
        }

    } else {
        display.innerHTML = 0;
        digitCounter = 0;
    }
}

/**
* Square root "V" button functionality
*/
function root(){

    const number = Number(display.innerText);

    if (!Number.isInteger(number)){
        parseFloat(number.toFixed(6))
    }

    if (number < 0 || isNaN(number)) {
        display.innerText = 'Use only real numbers'
    } else {
        const sr = Math.sqrt(number);

        if (!Number.isInteger(sr)) {
            display.innerText = parseFloat(sr.toFixed(6));
        } else {
            display.innerText = sr;
        }
    }

    digitCounter = 0;
}

/**
* Keyboard input for calculator
* @param {object} event fired from keydown listener
*/
function keyboardSupport(event) {

    // Type numbers on display
    if (event.key >= 0 && event.key  <= 9) {

        if (digitCounter === 0) {
            display.innerText = '';
        }

        display.innerText += event.key;
        digitCounter += 1;
    }

    // Calculate when an operator or equal is pressed
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '=') {
        calculate(event);
    }

    // Clear display
    if (event.key === 'c') {
        clear();
    }

    // Del functionality on 'Backspace'
    if (event.key === 'Backspace') {
        backspace();
    }

    // Square root on 'v'
    if (event.key === 'v') {
        root();
    }

    // +/- on '_'
    if (calculation.operator !== '-') {
        if (event.key === '_') {
            negative();
        }
    }

    // Add decimal sign
    if (event.key === '.') {
        const displayString = display.innerText;

        // Allow only one '.'
        if (!displayString.includes('.')){
            display.innerText += '.';
        }
    }
}
