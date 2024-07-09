const calcDisplay = document.querySelector('.calcDisplay');
let displayNum = ''
let firstNum = 0
let secondNum = 0;
let numSwitch = 0;
let mode = 'none'

const numberInputs = Array.from(document.querySelectorAll('[data-number]'))
numberInputs.forEach(input => {
    input.addEventListener('click', () => {
        addToDisplay(input.dataset.number)
    })
})

const inputs = {
    leftParenBtn: document.querySelector('#leftParen'),
    rightParenBtn: document.querySelector('#rightParen'),
    percentBtn: document.querySelector('#percent'),
    clearBtn: document.querySelector('#clear'),
    divideBtn: document.querySelector('#divide'),
    multiplyBtn: document.querySelector('#multiply'),
    minusBtn: document.querySelector('#minus'),
    decimalBtn: document.querySelector('#decimal'),
    equalBtn: document.querySelector('#equals'),
    plusBtn: document.querySelector('#plus')
}

const eventListeners = [
    window.addEventListener('keyup', (e) => {
        console.log(e.key)
        try {
            if (!isNaN(e.key)) {
                const key = e.key
                addToDisplay(key)
            }
            if (e.key === 'Backspace') {
                if (displayNum.length >= 1) {
                    displayNum = displayNum.slice(0, -1)
                    updateDisplay(displayNum)
                    if (displayNum === '') {
                        updateDisplay(0)
                    }
                } else if (!displayNum.length) {
                    updateDisplay(0)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }),
    inputs.clearBtn.addEventListener('click', () => clearDisplay()),
    inputs.plusBtn.addEventListener('click', () => {
        checkNumber();
        if (numSwitch !== 1) {
            changeMode('add');
        } else if (numSwitch === 1) {
            changeFirstNum()
            mode = 'add'
        }
    }),
    inputs.minusBtn.addEventListener('click', () => {
        checkNumber();
        if (numSwitch !== 1) {
            changeMode('subtract');
        }
    }),
    inputs.multiplyBtn.addEventListener('click', () => {
        checkNumber();
        if (numSwitch !== 1) {
            changeMode('multiply');
        }
    }),
    inputs.divideBtn.addEventListener('click', () => {
        checkNumber();
        if (numSwitch !== 1) {
            changeMode('divide');
        }
    }), (
        inputs.decimalBtn.addEventListener('click', () => {
            console.log('hello')
            displayNum += '.'
        })),
    inputs.equalBtn.addEventListener('click', () => {
        if (numSwitch === 1) {
            checkNumber();
            changeSecondNum();
            if (mode === 'add') {
                add();
            }
            if (mode === 'subtract') {
                subtract();
            }
            if (mode === 'multiply') {
                multiply();
            }
            if (mode === 'divide') {
                divide();
            }
            reduceNumLength();
            updateDisplay(displayNum);
            resetNums();
        }
    })
]

function changeFirstNum() {
    firstNum = parseFloat(displayNum);
    displayNum = '';
}

function changeSecondNum() {
    secondNum = parseFloat(displayNum);
}

function changeMode(newMode) {
    changeFirstNum();
    numSwitch = 1;
    mode = newMode;
}

function checkNumber() {
    if (!Number.isInteger(parseInt(displayNum))) {
        displayNum = 0;
    }
    if (!Number.isInteger(parseInt(firstNum))) {
        firstNum = 0;
    }
    if (!Number.isInteger(parseInt(secondNum))) {
        secondNum = 0;
    }
}

function reduceNumLength() {
    if(displayNum.length > 12) {
        displayNum = displayNum.slice(0, -(displayNum.length - 12))
    }
}

function addToDisplay(numInput) {
    if (displayNum === '0') {
        displayNum = ''
    }
    displayNum += numInput
    updateDisplay(displayNum)
    console.log(displayNum)
}

function updateDisplay(value) {
    calcDisplay.innerHTML = value;
}

function clearDisplay() {
    displayNum = ''
    resetNums()
    calcDisplay.innerHTML = '0';
}

function resetNums() {
    firstNum = 0;
    secondNum = 0;
    mode = 'none';
    numSwitch = 0;
}

function add() {
    displayNum = String(firstNum + secondNum);
}

function subtract() {
    displayNum = String(firstNum - secondNum);
}

function multiply() {
    displayNum = String(firstNum * secondNum)
}

function divide() {
    displayNum = String(firstNum / secondNum)
}