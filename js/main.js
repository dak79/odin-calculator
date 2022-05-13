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

const buttons = document.querySelectorAll('.num');
const display = document.querySelector('#display1');
buttons.forEach(button => {
    button.addEventListener('click', populateDisplay)
});

/**
* Display the number typed on calc pad and store it in a variable
* @param {object} event fired from click listener on calc number's buttons
*/
function populateDisplay(event) {
        display.innerText += event.target.dataset.number;
        let displayValue = display.innerText;
        console.log(displayValue);
}

/* Test in console */
console.log('Arithmetic Functions');
console.log(add(2, 2));
console.log(substract(3, 9));
console.log(multiply(3, 3));
console.log(divide(4, 2));

console.log('Operate Function')
console.log(operate("+", 2, 2));
console.log(operate("-", 3, 9));
console.log(operate("*", 3, 3));
console.log(operate("/", 4, 2));
