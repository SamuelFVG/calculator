const display = document.getElementById('display');
const buttons = document.getElementById('buttons-container');

const options = [
    ['C', '←', '±', 'x'],
    [9, 8, 7, '÷'],
    [6, 5, 4, '+'],
    [3, 2, 1, '-'],
    [0, '.', '=']
];   

const operations = 'C←±x÷+-='; 


function calculate(event) {
    if (!operations.includes(this.textContent)) display.textContent = this.textContent;
}


options.forEach(line => {
    const row = document.createElement('div'); //parent row container
    row.classList.add('parent-row');
    buttons.appendChild(row);

    line.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn');
        if (option == 0) button.style.minWidth = '50%';
         
        button.textContent = option;
        button.addEventListener('click', calculate);

        row.appendChild(button);
    });
});