const display = document.getElementById('display');
const buttons = document.getElementById('buttons-container');
let amountOfItems = 4;

for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.classList.add('parent-row')
    buttons.appendChild(row);

    if (i == 4) {
        amountOfItems = 3;
        row.classList.add('last-row');
    }
    for (let j = 0; j < amountOfItems; j++) {
        const button = document.createElement('button');
        button.classList.add('btn');
        row.appendChild(button);
    }
}