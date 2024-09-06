const calcDisplay = document.querySelector('.calcDisplay');
let displayNum = '';
let firstNum = '';
let secondNum = '';
let endNum = 0;
let numSwitch = 0;
let mode = 'none';

const numberInputs = Array.from(document.querySelectorAll('[data-number]'))
numberInputs.forEach(input => {
    input.addEventListener('click', () => {
        if (numSwitch !== 1) {
            firstNum += parseInt(input.dataset.number);
            updateDisplay(firstNum);
        } else if (numSwitch === 1) {
            secondNum += parseInt(input.dataset.number);
            updateDisplay(secondNum);
        }
    })
})

window.addEventListener('keyup', (e) => {
    console.log(e.key)
    try {
        if (numSwitch === 0) {
            if (!isNaN(e.key)) {
                firstNum += e.key;
                updateDisplay(firstNum);
            }
            if (e.key === 'Backspace') {
                if (firstNum.length >= 1) {
                    firstNum = firstNum.slice(0, -1)
                    updateDisplay(firstNum)
                } else if (firstNum === '' || !firstNum.length) {
                    updateDisplay(0)
                }
            }
        } else if (numSwitch === 1) {
            if (!isNaN(e.key)) {
                secondNum += e.key;
                updateDisplay(secondNum);
            }
            if (e.key === 'Backspace') {
                if (secondNum.length >= 1) {
                    secondNum = secondNum.slice(0, -1)
                    updateDisplay(secondNum)
                } else if (secondNum === '' || !secondNum.length) {
                    updateDisplay(0)
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
})

// DOM selectors

const buttons = {
    clearBtn: document.querySelector('#clear'),
    decimalBtn: document.querySelector('#decimal'),
    equalBtn: document.querySelector('#equals'),
}

const operators = {
    divideBtn: document.querySelector('#divide'),
    multiplyBtn: document.querySelector('#multiply'),
    minusBtn: document.querySelector('#minus'),
    plusBtn: document.querySelector('#plus')
}

const secOperators = {
    percentBtn: document.querySelector('#percent'),
    powerBtn: document.querySelector('#power'),
    squareBtn: document.querySelector('#square')
}

// Event Listeners

for (let btn in operators) {
    operators[btn].addEventListener('click', (e) => {
        for (let input in operators) {
            console.log(operators[input])
            if (operators[input].classList.contains('active') && operators[input] !== e.target) {
                removeActiveClass(); //Loop runs over the operators objects to remove active form any buttons other than the one pressed
            }
        }
        if (!operators[btn].classList.contains('active')) {
            operators[btn].classList.add('active')
            numSwitch = 1;
        } else if (operators[btn].classList.contains('active')) {
            operate(operators[btn]);
            updateNums();
            updateDisplay(firstNum);
        }
    });
}

for (let btn in secOperators) {
    secOperators[btn].addEventListener('click', () => {
        operate(secOperators[btn]);
    })
}

buttons.decimalBtn.addEventListener('click', () => {
    if (numSwitch === 0 && !firstNum.includes('.')) {
        firstNum += '.'
        updateDisplay(firstNum);
    }
    if (numSwitch === 1 && !secondNum.includes('.')) {
        secondNum += '.'
        updateDisplay(secondNum);
    }
})

buttons.equalBtn.addEventListener('click', () => {
    checkNums();
    for (let btn in operators) {
        if (operators[btn].classList.contains('active')) {
            operate(operators[btn]);
            endEquation();
        }
    }
})

buttons.clearBtn.addEventListener('click', () => {
    endEquation();
    firstNum = '';
})

//Display functions

function updateDisplay(num) {
    displayNum = num;
    // reduceNumLength()
    calcDisplay.innerHTML = displayNum;
}

function removeActiveClass() {
    for (let btn in operators) {
        if (operators[btn].classList.contains('active')) {
            operators[btn].classList.remove('active');
        }
    }
}

function endEquation() {
    updateDisplay(endNum);
    updateNums();
    removeActiveClass();
    mode = 'none';
    numSwitch = 0;
}

function checkNums() {
    if (!Number.isInteger(parseInt(firstNum))) {
        firstNum = 0;
    }
    if (!Number.isInteger(parseInt(secondNum))) {
        secondNum = 0;
    }
}

function updateNums() {
    firstNum = endNum.toString();
    secondNum = '';
    endNum = 0;
    if (firstNum == 0) {
        firstNum = '';
    }
}

function reduceNumLength() {
    if (displayNum.toString().length > 12) {
        displayNum = Number.parseFloat(displayNum).toExponential(3)
    }
}

//Math functions


function operate(obj) {
    checkNums();
    function add(x, y) {
        endNum = parseFloat(x) + parseFloat(y);
    }

    function subtract(x, y) {
        endNum = parseFloat(x) - parseFloat(y);
    }

    function multiply(x, y) {
        endNum = parseFloat(x) * parseFloat(y);
    }

    function divide(x, y) {
        endNum = parseFloat(x) / parseFloat(y);
        if (x == 0 || y == 0) {
            endNum = 0
        }
    }
    function power(x, y) {
        if (numSwitch === 0) {
            firstNum = Math.pow(x, 2);
            updateDisplay(firstNum);
        } else if (numSwitch === 1) {
            secondNum = Math.pow(y, 2);
            updateDisplay(secondNum);
        }
    }
    function square(x, y) {
        if (numSwitch === 0) {
            firstNum = Math.sqrt(x);
            updateDisplay(firstNum);
        } else if (numSwitch === 1) {
            secondNum = Math.sqrt(y);
            updateDisplay(secondNum);
        }
    }
    function percent(x, y) {
        if (numSwitch === 0) {
            firstNum = x / 100
            updateDisplay(firstNum);
        } else if (numSwitch === 1) {
            secondNum = y / 100
            updateDisplay(secondNum);
        }
    }

    switch (obj) {
        case operators.plusBtn:
            add(firstNum, secondNum);
            break;
        case operators.minusBtn:
            subtract(firstNum, secondNum);
            break;
        case operators.multiplyBtn:
            multiply(firstNum, secondNum);
            break;
        case operators.divideBtn:
            divide(firstNum, secondNum);
            break;
        case secOperators.powerBtn:
            power(firstNum, secondNum);
            break;
        case secOperators.squareBtn:
            square(firstNum, secondNum);
            break;
        case secOperators.percentBtn:
            percent(firstNum, secondNum);
            break;
    }
}