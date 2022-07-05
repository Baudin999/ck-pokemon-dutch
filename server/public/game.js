
let currentWord;


// initialize an array with the game's dutch words
var words = [
    "aardbei",
    "aardbeien",
    "boterbloem",
    "banaan",
    "behouden",
    "bijt",
    "auto",
    "aandrijven",
    "andersom",
    "zouden",
    "zweven",
    "zwijgen",
    "houden",
    "hij houdt",
    "ik hou van"
];

// list of sentences which congratulate the user
var congrats = [
    "Wat gaat het goed!",
    "Super!",
    "Ga zo door!",
    "Je kunt het!",
    "Niet verslappen!",
    "Je bent er bijna!",
    "Die was mooi!"
];


// select a random word from the array of words and speak it aloud
function speakWord(reuseWord) {

    if (words.length === 0 || opponentHP <= 0) {
        readOutLoud('Je hebt het spel uitgespeeld!');
        readOutLoud('Kies een nieuwe pokemon om het nog een keer te kunnen spelen!');
        document.getElementById('winning').classList.add('pyro');
        return;
    };

    setTimeout(function() {
        if (!reuseWord) {
            currentWord = words[Math.floor(Math.random() * words.length)];
            // remove the word from the array so it can't be repeated
            words.splice(words.indexOf(currentWord), 1);
        }
        // speak the word
        readOutLoud(currentWord);
    }, 1000);
}


document.getElementById('btn-next').onclick = function() {
    document.getElementById('input').focus();
    speakWord(false);
}


document.getElementById('input').onkeyup = function(e) {
    if (e.keyCode === 13) {
        document.getElementById('btn-check').click();
    }
}
document.getElementById('btn-check').onclick = function() {
    const input = document.getElementById('input');

    if (input.value !== currentWord) {
        input.style.backgroundColor = 'red';
        input.style.color = 'white';
        readOutLoud('That is incorrect');
        setTimeout(function() {
            input.style.backgroundColor = 'white';
            input.style.color = 'black';
            input.value = '';

            // reduce your HP by 10
            yourHP -= 10;
            yourHPBox.innerText = yourHP;

            speakWord(true);
        }, 1000);
    }
    else {
        input.style.backgroundColor = 'green';
        input.style.color = 'white';

        // random correct sentence
        const correctSentence = congrats[Math.floor(Math.random() * congrats.length)];
        readOutLoud(correctSentence);

        // reduce opponent HP by 10
        opponentHP -= 50;
        opponentHPBox.innerText = opponentHP;

        setTimeout(function() {
            input.style.backgroundColor = 'white';
            input.style.color = 'black';
            input.value = '';

            speakWord(false);
        }, 1000);
    }


}
