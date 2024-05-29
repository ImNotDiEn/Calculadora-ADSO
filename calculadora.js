document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('button'));
    const history = document.getElementById('history');
    
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
            } else {
                handleOperator(value);
            }
        });
    });

    function handleNumber(number) {
        currentInput += number;
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput === '' && op !== '-') return;

        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            calculate();
        }

        operator = op;
        currentInput = '';
    }

    function calculate() {
        if (operator === null || currentInput === '') return;

        const secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        addToHistory(`${firstOperand} ${operator} ${currentInput} = ${result}`);
        display.value = result;
        firstOperand = result;
        currentInput = '';
        operator = null;
    }

    function clear() {
        currentInput = '';
        operator = null;
        firstOperand = null;
        updateDisplay();
    }

    function updateDisplay() {
        display.value = currentInput || '0';
    }

    function addToHistory(entry) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = entry;
        history.appendChild(listItem);
    }
});