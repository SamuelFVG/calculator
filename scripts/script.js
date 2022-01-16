const mainContainer = document.getElementById('main-button-container');

for (let i = 0; i < 5; i++) {
    const horizontalContainer = document.createElement('div');
    horizontalContainer.classList.add('horizontal-container');
    mainContainer.appendChild(horizontalContainer);

    let ammountOfButtons = (i != 4) ? 4 : 3;

    for (let j = 0; j < ammountOfButtons; j++) {
        const btn = document.createElement('button');
        btn.classList.add('calculator-button')
        btn.classList.add('btn');
        horizontalContainer.appendChild(btn);
    }
}