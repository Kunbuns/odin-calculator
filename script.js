document.addEventListener("DOMContentLoaded", function () {
    const clear = document.querySelector("#clearButton");
    const decimal = document.querySelector("#decimalButton");
    const equal = document.querySelector("#equalButton");

    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");

    const display = document.querySelector("#displayScreen");

    let currentValue = "0";
    let firstOperand = null;
    let operator = null;

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent);
        display.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener("click", function(e) {
        handleOperator(e.target.textContent);
    }));

    decimal.addEventListener("click", function() {
        handleDecimal();
        display.textContent = currentValue;
    });

    clear.addEventListener("click", function () {
        currentValue = "0";
        firstOperand = null;
        operator = null;
        display.textContent = currentValue;
    });

    equal.addEventListener("click", function () {
        if (firstOperand !== null && operator !== null && currentValue !== "") {
            let result = operate(parseFloat(firstOperand), parseFloat(currentValue), operator);
            if (result !== "Error") {
                result = formatResult(result);
            }
            currentValue = result.toString();
            display.textContent = currentValue;
            firstOperand = null;
            operator = null;
        }
    });

    function handleNumber(num) {
        if (currentValue.length < 11) {
            if (currentValue === "0") {
                currentValue = num;
            } else {
                currentValue += num;
            }
        }
    }

    function handleDecimal() {
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    }

    function handleOperator(op) {
        if (currentValue === "") return;

        if (firstOperand === null) {
            firstOperand = currentValue;
            operator = op;
            currentValue = "";
        } else {
            let result = operate(parseFloat(firstOperand), parseFloat(currentValue), operator);
            if (result !== "Error") {
                result = formatResult(result);
            }
            firstOperand = result.toString();
            operator = op;
            currentValue = "";
            display.textContent = firstOperand;
        }
    }

    function operate(a, b, op) {
        switch(op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '/':
                return b !== 0 ? a / b : "Nice Try!";
            default:
                return "Nice Try!";
        }
    }

    function formatResult(num) {
        let str = num.toString();
        if (str.length > 11) {
            if (Number.isInteger(num)) {
                str = str.slice(0, 11);
            } else {
                str = num.toFixed(8);
                str = str.replace(/\.?0+$/, '');
                if (str.length > 11) {
                    str = str.slice(0, 11);
                }
            }
        }
        return str;
    }
});
