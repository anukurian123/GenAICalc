let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Initialize display
display.value = '0';

// Add event listeners for number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (waitingForSecondOperand) {
            display.value = button.textContent;
            waitingForSecondOperand = false;
        } else {
            display.value = display.value === '0' ? button.textContent : display.value + button.textContent;
        }
        currentInput = display.value;
    });
});

// Add event listener for decimal point
document.querySelector('.decimal').addEventListener('click', () => {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
});

// Add event listeners for operators
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        const inputValue = parseFloat(display.value);
        
        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            display.value = String(result);
            firstOperand = result;
        }
        
        waitingForSecondOperand = true;
        operator = button.textContent;
    });
});

// Add event listener for equals button
document.querySelector('.equals').addEventListener('click', () => {
    const inputValue = parseFloat(display.value);
    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        display.value = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true;
    }
});

// Add event listener for clear button
document.querySelector('.clear').addEventListener('click', () => {
    display.value = '0';
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
});

// Calculate function
function calculate(first, second, op) {
    switch(op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        default:
            return second;
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        document.querySelector(`button.number:nth-child(${event.key === '0' ? 10 : parseInt(event.key)})`).click();
    } else if (event.key === '.') {
        document.querySelector('.decimal').click();
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        document.querySelector(`button.operator:contains(${event.key})`).click();
    } else if (event.key === 'Enter' || event.key === '=') {
        document.querySelector('.equals').click();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        document.querySelector('.clear').click();
    }
});
