document.addEventListener('DOMContentLoaded', (event) => {
    const board = document.getElementById('game-board');
    const diceResult = document.getElementById('dice-result');
    const colorMapping = {
        13: 'color-13',
        12: 'color-12',
        11: 'color-11',
        9: 'color-9',
        8: 'color-8',
        7: 'color-7',
        6: 'color-6',
        5: 'color-5',
        1: 'color-1'
    };
    const colorAssignment = [
        1, 1, 1, 1, 5, 6, 7, 8, 9, 5,
        11, 12, 13, 7, 5, 8, 1, 9, 1, 5,
        7, 11, 1, 12, 5, 13, 9, 7, 1, 6,
        1, 8, 11, 1, 7, 12, 1, 1, 13, 8,
        1, 7, 1, 11, 9, 1, 1, 12, 7, 5,
        1, 13, 1, 9, 11, 8, 1, 1, 1, 12,
        1, 1, 9, 8, 13, 11, 1, 1, 1, 7,
        1, 12, 1, 1, 5, 1, 11, 13, 1, 8,
        9, 1, 1, 12, 5, 1, 1, 11, 1, 6,
        13, 1, 1, 1, 5, 12, 1, 7, 11, 5
    ];

    // Create the game board with colors
    for (let i = 0; i < 100; i++) 
    {
        const square = document.createElement('div');
        square.textContent = i + 1;
        square.dataset.number = i + 1;
        square.classList.add(colorMapping[colorAssignment[i]]);
        board.appendChild(square);
    }

    document.getElementById('roll-dice').addEventListener('click', rollDice);
});

function rollDice() 
{
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').textContent = `You rolled: ${dice1}, ${dice2}, ${dice3}`;
    window.currentDice = [dice1, dice2, dice3];
}

function placeTile(color) 
{
    if (!window.currentDice) 
    {
        alert('Please roll the dice first!');
        return;
    }
    const [dice1, dice2, dice3] = window.currentDice;
    const possibleNumbers = calculatePossibleNumbers(dice1, dice2, dice3);
    let selectedNumber = prompt(`You rolled ${dice1}, ${dice2}, ${dice3}. Choose a number to place your ${color} tile on: ${possibleNumbers.join(', ')}`);
    selectedNumber = parseInt(selectedNumber);
    if (possibleNumbers.includes(selectedNumber)) 
    {
        const square = document.querySelector(`#game-board div[data-number='${selectedNumber}']`);
        if (!square.classList.contains('occupied')) 
        {
            square.classList.add('occupied', color);
            square.textContent = color[0].toUpperCase();
        } 
        else 
        {
            alert('This space is already occupied!');
        }
    } 
    else 
    {
        alert('Invalid choice! Please choose a number from the list.');
    }
}

function calculatePossibleNumbers(dice1, dice2, dice3) 
{
    const numbers = new Set();
    numbers.add(dice1 + dice2 + dice3);
    numbers.add(dice1 * dice2 * dice3);
    if ((dice1 * dice2) % dice3 === 0) numbers.add(dice1 * dice2 / dice3);
    if ((dice2 * dice3) % dice1 === 0) numbers.add(dice2 * dice3 / dice1);
    if ((dice1 * dice3) % dice2 === 0) numbers.add(dice1 * dice3 / dice2);
    numbers.add(dice1 + dice2 - dice3);
    numbers.add(dice1 - dice2 + dice3);
    numbers.add(-dice1 + dice2 + dice3);
    return Array.from(numbers).filter(num => num > 0 && num <= 100);
}
