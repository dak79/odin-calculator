/* Arithmetic functions */

/**
* @param {number} a first addend
* @param {number} b second addend
* @return {number} sum
*/
function add(a, b) {
    return a + b;
}

/**
* @param {number} a minuend
* @param {number} b subtrahend
* @return {number} difference
*/
function substract(a, b) {
    return a - b;
}

/**
* @param {number} a first factor
* @param {number} b second factor
* @return {number} product
*/
function multiply(a, b) {
    return a * b;
}

/**
* @param {number} a dividend
* @param {number} b divisor
* @return  {number} quotient
*/
function divide(a, b) {
    return a / b;
}


/* Test in console */
console.log(add(2, 2));

console.log(substract(3, 9));

console.log(multiply(3, 3));

console.log(divide(4, 2));
