const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const revealWord = document.getElementById('reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['red', 'yellow', 'black', 'violet', 'cyan', 'blue', 'white', 'pink', 'orange', 'green'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(letter => `
        <span class = "letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>`)
            .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, ''); //replace new line character with empty character globally(g)

    if (innerWord === selectedWord) {
        finalMessage.innerHTML = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    //check if lost and reveal the word
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerHTML = 'Unfortunately you lost! 😕';
        revealWord.style.display = 'block';
        revealWord.innerHTML = `...the word was: ${selectedWord}`;
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//key press event listener
window.addEventListener('keydown', e => {
    // console.log(e.key, e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//play again event listener
playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    updateWrongLettersEl();

    revealWord.style.display = 'none';

    popup.style.display = 'none';
});

displayWord();