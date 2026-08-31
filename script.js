let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    currentNumber += number;

    updateDisplay();
}


function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "") {

        if (previousNumber !== "") {
            calculate();
        }

        previousNumber = currentNumber;
        currentNumber = "";
    }

    operator = selectedOperator;

    previousDisplay.textContent =
        previousNumber + " " + getOperatorSymbol(operator);
}


function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    let previous = parseFloat(previousNumber);
    let current = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":

            if (current === 0) {
                currentDisplay.textContent = "Error";
                currentNumber = "";
                previousNumber = "";
                operator = "";
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;
    }

    currentNumber = parseFloat(result.toFixed(10)).toString();

    previousNumber = "";
    operator = "";

    previousDisplay.textContent = "";

    updateDisplay();
}


function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
}


function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


function updateDisplay() {

    currentDisplay.textContent =
        currentNumber === "" ? "0" : currentNumber;
}


function getOperatorSymbol(operator) {

    if (operator === "*") return "×";
    if (operator === "/") return "÷";
    if (operator === "-") return "−";

    return operator;
}


/* Keyboard Support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    if (["+", "-", "*", "/", "%"].includes(key)) {
        chooseOperator(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Backspace") {
        deleteNumber();
    }

    if (key === "Escape") {
        clearDisplay();
    }
});