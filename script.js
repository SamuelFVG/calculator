const display = document.getElementById('display');
const buttons = document.getElementById('buttons-container');

const options = [
    ['C', '←', '±', 'x'],
    [9, 8, 7, '÷'],
    [6, 5, 4, '+'],
    [3, 2, 1, '-'],
    [0, '.', '=']
];    

function evaluate(arr) {
    const op = {
        'x': (a, b) => a * b,
        '÷': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
    };

    function calculationAlgorithm(arr, operators) {
        for (let i = 1; i < arr.length; i += 2) {
            if (arr[i] == operators[0] || arr[i] == operators[1]) {
                arr[i + 1] = op[arr[i]](+arr[i - 1], +arr[i + 1]);
                delete arr[i];
                delete arr[i - 1];  
            }
        }
    }
    

    calculationAlgorithm(arr, ['x', '÷']);
    arr = arr.filter(item => {
        if (item) return true;
        else if(item === 0) return true;
    });
    calculationAlgorithm(arr, ['+', '-']);
    arr = arr.filter(item => {
        if (item) return true;
        else if(item === 0) return true;
    });
    
    if (arr[0] == 'Infinity' || arr[0] == '-Infinity' || isNaN(arr[0])) arr[0] = 'Do not divide by 0.';
    else arr[0] = Math.floor(arr[0]*100)/100;
    return arr;
}
let clickedEqual = 0;
function calculate(option) {
    if (display.textContent == 'Do not divide by 0.') {
        display.textContent = '';
    }
    if (clickedEqual == '3') clickedEqual = 0;

    let textArr = display.textContent.split(' '), 
        len = textArr.length - 1;
    
    switch (true) {
        case option == '.':
            if (textArr[len] == ''){ 
                textArr[len] = '0';
            }  
            option = textArr[len].includes('.') ? '' : '.'; 
            textArr[len] = textArr[len] + option;    
            break;

        case option == 'C':
            textArr = [];
            break;

        case option == '←':
            if (textArr[len] === '') {
                textArr.pop();
                textArr.pop();
            }
            else{    
                textArr[len] = textArr[len].slice(0, textArr[len].length - 1);
                if (textArr[len] == '-') textArr.pop();
            }
            break;
        
        case option == '±':
            textArr[len] = -Number(textArr[len]);
            break;
        
        case option == '=':
            if (textArr[len] !== ''){
                textArr = evaluate(textArr);
                clickedEqual++;
            }
            break;
        
        case isNaN(option):
            if (textArr[len] === ''){
                break;
            } else {
                textArr.push(option);
                textArr.push('');
            } 
            break;

        default:
            if (clickedEqual) {
                textArr = [''];
                clickedEqual = 0;
            }

            textArr[len] += option;
            break;
    }    
    
    if (clickedEqual) clickedEqual++;
    
    console.log(textArr);
    display.textContent = textArr.join(' ');
}


options.forEach(line => {
    const row = document.createElement('div'); //parent row container
    row.classList.add('parent-row');
    buttons.appendChild(row);

    line.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn');
        if (option == 0) button.style.minWidth = '50%';
        if (line.indexOf(option) == line.length - 1) button.classList.add('last-right-btn');
        if (options.indexOf(line) == 0) button.classList.add('first-top-btn');
        button.textContent = option;
        button.addEventListener('click', e => calculate(e.target.textContent));

        row.appendChild(button);
    });
});

document.addEventListener('keydown', e => {
    keyChoice = e.key;

    if (keyChoice == '*') keyChoice = 'x';
    else if (keyChoice == '/') keyChoice = '÷';
    else if (keyChoice == 'c') keyChoice = 'C';
    else if (keyChoice == 'Backspace') keyChoice = '←';
    else if (keyChoice == '!') keyChoice = '±';

    options.forEach(line =>{
        line.forEach(op =>{
            if(keyChoice == op) calculate(keyChoice);
        });
    });
});