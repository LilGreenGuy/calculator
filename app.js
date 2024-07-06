const calcDisplay = document.querySelector('.calcDisplay');
let displayNums = '0'
let secondNum = ''

const inputs = {
leftParenBtn: document.querySelector('#leftParen'),
rightParenBtn: document.querySelector('#rightParen'),
percentBtn: document.querySelector('#percent'),
clearBtn: document.querySelector('#clear'),
sevenBtn: document.querySelector('#seven'),
eightBtn: document.querySelector('#eight'),
nineBtn: document.querySelector('#nine'),
divideBtn: document.querySelector('#divide'),
fourBtn: document.querySelector('#four'),
fiveBtn: document.querySelector('#five'),
sixBtn: document.querySelector('#six'),
multiplyBtn: document.querySelector('#multiply'),
oneBtn: document.querySelector('#one'),
twoBtn: document.querySelector('#two'),
threeBtn: document.querySelector('#three'),
minusBtn: document.querySelector('#minus'),
zeroBtn: document.querySelector('#zero'),
decimalBtn: document.querySelector('#decimal'),
equalBtn: document.querySelector('#equals'),
plusBtn: document.querySelector('#plus')
}

window.addEventListener('keyup', (e) => {
    try{
        console.log(e.key)
        if (Number.isInteger(parseInt(e.key)) && displayNums.length < 12) {
            if (displayNums[0] === '0') {
                displayNums = displayNums.substring(displayNums.length)
            }
            displayNums += e.key
            updateDisplay(displayNums)
        }
        if (e.key === 'Backspace') {
            if (displayNums.length > 1) {
                displayNums = displayNums.slice(0, -1)
                updateDisplay()
            } else if (displayNums.length === 1){
                displayNums = '0';
                updateDisplay();
            }
        }
    } catch (e) {
        console.log(e)
    }
})

inputs.clearBtn.addEventListener('click', () => clearDisplay())

function clearDisplay() {
    displayNums = '0'
    updateDisplay()
}

const updateDisplay = () => {
    calcDisplay.innerHTML = displayNums
    if (!displayNums[0]) {
        calcDisplay.innerHTML = 0
    }
}

//math logicals

function add(num1, num2) {

}