
let currentWord;


// initialize an array with the game's words
var words = [
    "abandon",
    "ability",
    "able",
    "about",
    "above"
];

// list of sentences which congratulate the user
var congrats = [
    "You are a master at this game!",
    "You are a great player!",
    "Well done!",
    "You are doing great!",
    "Keep it up!",
    "This is awesome!",
    "That is correct!",
    "You are right!"
];


// select a random word from the array of words and speak it aloud
function speakWord(reuseWord) {

    if (words.length === 0) {
        readOutLoud('You have finished the game!');
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

            speakWord(true);
        }, 1000);
    }
    else {
        input.style.backgroundColor = 'green';
        input.style.color = 'white';

        // random correct sentence
        const correctSentence = congrats[Math.floor(Math.random() * congrats.length)];
        readOutLoud(correctSentence);

        setTimeout(function() {
            input.style.backgroundColor = 'white';
            input.style.color = 'black';
            input.value = '';

            speakWord(false);
        }, 1000);
    }


}
