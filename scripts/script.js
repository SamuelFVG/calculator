const display = document.getElementById('display');
const mainContainer = document.getElementById('main-button-container');

const options =  [
    ['AC', '←', '^', 'v'],
    ['1',  '2', '3', '+'],
    ['4',  '5', '6', '-'],
    ['7',  '8', '9', '*'],
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

        btn.addEventListener('click', getInput);
    });
    
    if (line.length == 3) horizontalContainer.firstChild.style.minWidth = '50%'; // used to make the '0' button get 50% of the space
});

function getInput() {
    userBtnInput = `${this.textContent}`;
    console.log(userBtnInput);

    if (!isNaN(userBtnInput)){ 
        display.textContent += userBtnInput;
    }
}