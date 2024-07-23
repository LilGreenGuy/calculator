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

inputs.decimalBtn.addEventListener('click', () => {
    if (numSwitch === 0 && !firstNum.includes('.')) {
        firstNum += '.'
                updateDisplay(firstNum);
    }
    if (numSwitch === 1 && !secondNum.includes('.')) {
        secondNum += '.'
                updateDisplay(secondNum);
    }
})

for (let input in inputs) {
    if (inputs[input] === inputs.plusBtn
        || inputs[input] === inputs.minusBtn
        || inputs[input] === inputs.multiplyBtn
        || inputs[input] === inputs.divideBtn) {
        inputs[input].addEventListener('click', (e) => {
            for (let input in inputs) {
                if (inputs[input].classList.contains('active') && inputs[input] !== e.target) {
                    removeActiveClass(); //Loop runs over the inputs objects to remove active form any buttons other than the one pressed
                }
            }
            if (!inputs[input].classList.contains('active')) {
                inputs[input].classList.add('active')
                numSwitch = 1;
            } else if (inputs[input].classList.contains('active')) {
                operate(inputs[input]);
                updateNums();
                updateDisplay(firstNum);
            }
        });
    }
}

inputs.equalBtn.addEventListener('click', () => {
    checkNums();
    for (let input in inputs) {
        if (inputs[input].classList.contains('active')) {
            operate(inputs[input]);
        }
    }
    endEquation();
})

inputs.clearBtn.addEventListener('click', () => {
    endEquation();
    firstNum = '';
})

//Display functions

function updateDisplay(num) {
    displayNum = num
    calcDisplay.innerHTML = displayNum;
}

function removeActiveClass() {
    for (let input in inputs) {
        if (inputs[input].classList.contains('active')) {
            inputs[input].classList.remove('active');
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

    switch (obj) {
        case inputs.plusBtn:
            add(firstNum, secondNum);
            break;
        case inputs.minusBtn:
            subtract(firstNum, secondNum);
            break;
        case inputs.multiplyBtn:
            multiply(firstNum, secondNum);
            break;
        case inputs.divideBtn:
            divide(firstNum, secondNum);
            break;
    }
}