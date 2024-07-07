const calcDisplay = document.querySelector('.calcDisplay');
// let displayNum = '0'
let firstNums = ''
let secondNums = '';
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
                if (numSwitch === 0) {
                    if (firstNums.length >= 1) {
                        firstNums = firstNums.slice(0, -1)
                        updateDisplay(firstNums)
                        if (firstNums === '') {
                            updateDisplay(0)
                        }
                    } else if (!firstNums.length) {
                        updateDisplay(0)
                    }
                } else if (numSwitch === 1) {
                    secondNums = secondNums.slice(0, -1)
                    if(secondNums.length >= 1) {
                        updateDisplay(secondNums)
                    } else if (!secondNums.length) {
                        updateDisplay(0);
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }),
    inputs.clearBtn.addEventListener('click', () => clearDisplay()),
    inputs.plusBtn.addEventListener('click', () => {
        if (numSwitch !== 1) {
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
        if (secondNums === '') {
            secondNums = '0'
        }
        if (mode === 'add') {
            add()
            mode = 'none'
            numSwitch = 0;
            secondNums = ''
        }
        if (mode === 'subtract') {
            subtract()
            mode = 'none'
            numSwitch = 0
            secondNums = ''
        }
    })
]

function addToDisplay(numInput) {
    if (numSwitch === 0) {
        firstNums += numInput
        updateDisplay(firstNums)
        console.log(firstNums)
    } else if (numSwitch === 1) {
        secondNums += numInput
        updateDisplay(secondNums)
    }
}

function updateDisplay(value) {
    console.log(value)
    calcDisplay.innerHTML = value;
}

function clearDisplay() {
    firstNums = '';
    secondNums = '';
    numSwitch = 0;
    calcDisplay.innerHTML = '0';
}

function add() {
    firstNums = parseInt(firstNums) + parseInt(secondNums);
    secondNums = ''
    updateDisplay(firstNums)
}

function subtract() {
    firstNums = parseInt(firstNums) - parseInt(secondNums);
    secondNums = ''
    updateDisplay(firstNums)
}