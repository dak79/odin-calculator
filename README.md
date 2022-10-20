# Calculator

## Live Preview
[Calculator](https://dak79.github.io/odin-calculator/)

## Description
This project is part of [The Odin Project - Foundations Path](https://www.theodinproject.com/lessons/foundations-calculator). 
The goal here is to combine all HTML, CSS and JavaScript basis learned until this pont of the path. The outcome is a pocket calculator with some feature.

## Tecnologies
* HTML
* CSS
* JavaScript
* Git

## Assignement
* Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

* Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

* Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.

* There should also be a display for the calculator.

* Add a “clear” button.

* Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

* Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.

* This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

* Gotchas: watch out for and fix these bugs if they show up in your code:
    * Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time.
    * Your calculator should not evaluate more than a single pair of numbers at a time.
    * You should round answers with long decimals so that they don’t overflow the screen.
    * Pressing = before entering all of the numbers or an operator could cause problems!
    * Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
    * Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

* Extra Credit: 
    * Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one.
    * Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
    * Add a “backspace” button, so the user can undo if they click the wrong number.
    * Add keyboard support!
