const display = document.getElementById('display');
const mainContainer = document.getElementById('main-button-container');
/*
    Add keyboard functionality
*/


const options =  [
    ['C', '←', '!', '/'],
    ['1',  '2', '3', '*'],
    ['4',  '5', '6', '-'],
    ['7',  '8', '9', '+'],
    ['0',       '.', '=']
];

options.forEach(line => {
    const horizontalContainer = document.createElement('div');
    horizontalContainer.classList.add('horizontal-container');
    mainContainer.appendChild(horizontalContainer);

    line.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('calculator-button');
        btn.textContent = option;
        horizontalContainer.appendChild(btn);

        btn.addEventListener('click', event => getInput(event.target.textContent));
    });
    
    if (line.length == 3) horizontalContainer.firstChild.style.minWidth = '50.2%'; // used to make the '0' button get 50% of the space
});

let previousUserBtn = '+';
let userClickedEquals;
function getInput(userBtnInput) {
    //const userBtnInput = `${this.textContent}`;
    

    if (userBtnInput == 'C'){
        display.textContent = '';
    }
    else if(userBtnInput == '←'){
        let amount;
        if (display.textContent[display.textContent.length - 1] == ' ') amount = 3;
        else amount = 1;  
        display.textContent = display.textContent.slice(0, display.textContent.length - amount)
    }
    else if(userBtnInput == '!') {
        let splitted = display.textContent.split(' ');
        splitted[splitted.length - 1] = -splitted[splitted.length - 1];
        display.textContent = splitted.join(' ');
    }
    else if (userBtnInput == '='){
        if (isNaN(previousUserBtn) && previousUserBtn != '.' && previousUserBtn != '←' && previousUserBtn != '!') return; // if the last click was '+, -, etc
        operations = display.textContent.split(' ');
        userClickedEquals = true;
        display.textContent = showResults(operations);
        previousUserBtn = display.textContent;
        return;
    } 
    //If the button clicked is not a number or a dot AND the previous buton clicked was a number or a dot. The last part is to prevent "+ + or - - -, etc"
    else if ((isNaN(userBtnInput) && userBtnInput!='.') && (!isNaN(previousUserBtn) || previousUserBtn == '.' || previousUserBtn == '←' || previousUserBtn == '!')) { 
        display.textContent += ` ${userBtnInput} `
    }
    else if (userBtnInput == '.'){
        if (userClickedEquals) display.textContent = ''; // replace the number that was on the screen if the user doesn't use it
        let currentNumber = display.textContent.split(' ').pop(); //get the number the user is currently in
        if (currentNumber.includes('.')) return; // if that number has already a dot, do not add another one
        if (currentNumber == '') display.textContent += 0.; // if there's nothing before the dot, add a 0
        display.textContent += '.';
    }
    else if (!isNaN(userBtnInput)){ 
        if (userClickedEquals) display.textContent = '';
        display.textContent += userBtnInput;
    }

    userClickedEquals = false;
    operations = display.textContent.split(' ');
    console.log(operations);
    previousUserBtn = userBtnInput;
}   
/*------------------------------------------Keyboard Input------------------------------------------*/
document.addEventListener('keydown', event => {
    if (event.repeat) return;
    let eventValue = event.key;
    //console.log(eventValue == 'Enter');
    switch (eventValue) {
        case 'Backspace':
            eventValue = '←';
            break;
        case 'Enter':
            eventValue = '=';
        case 'c':
            eventValue = eventValue.toUpperCase();
    }

    options.forEach(option => {

        if (option.includes(eventValue)) getInput(eventValue);
    });
    
});
function showResults(operations) {
    function calculationAlgo(a, b) { 
        for (let i = 1; i < operations.length; i += 2){
            if(operations[i] == a || operations[i] == b){
                operations[i + 1] = obj[operations[i]](+operations[i - 1], +operations[i + 1]);
                delete operations[i];
                delete operations[i - 1];
            }
    
        }
    }
    let obj = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => a / b,
        '*': (a, b) => a * b,
    }

    calculationAlgo('*', '/');
    operations = operations.filter(item => item);
    console.log(operations);
    calculationAlgo('+', '-');
    operations = operations.filter(item => item);

    return Math.round(operations[0]*10000)/10000;
}
