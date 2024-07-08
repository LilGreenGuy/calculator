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
        if (numSwitch !== 1) {
            checkNumber()
            changeNums()
            numSwitch = 1
            mode = 'add'
        }
    }),
    inputs.minusBtn.addEventListener('click', () => {
        if (numSwitch !== 1) {
            numSwitch = 1
            mode = 'subtract'
        }
    }),
    inputs.equalBtn.addEventListener('click', () => {
        checkNumber()
        if (mode === 'add') {
            secondNum = parseInt(displayNum);
            add();
            mode = 'none';
            numSwitch = 0;
        }
        if (mode === 'subtract') {
            subtract()
            mode = 'none'
            numSwitch = 0
            secondNum = ''
        }
        updateDisplay(displayNum);
        resetNums();
    })
]
function changeNums() {
                firstNum = parseInt(displayNum);
            displayNum = ''
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
    numSwitch = 0;
    calcDisplay.innerHTML = '0';
}

function resetNums() {
    firstNum = 0
    secondNum = 0
}

function add() {
    console.log(firstNum)
    displayNum = String(firstNum + secondNum);
    console.log(displayNum)
}

function subtract() {
    firstNum = parseInt(firstNum) - parseInt(secondNum);
    secondNum = ''
}