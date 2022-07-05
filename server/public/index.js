const synth = window.speechSynthesis;
let voice,
    pokemonList,
    yourHP = 100,
    opponentHP = 100,
    yourHPBox = document.getElementById('your-pokemon-HP'),
    opponentHPBox = document.getElementById('opponent-pokemon-HP');


synth.onvoiceschanged = function() {
    let voices = synth.getVoices();
    // voices.forEach(function(voice) {
    //     console.log(voice);
    // });

    voice = voices.find(voice => voice.name === 'Xander');
    // voice = voices.find(voice => { return voice.name === 'Oliver'; });
}

const init = async function() {
    // get random pokemon from the pokemonList
    let pokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    document.getElementById('opponent-pokemon').src = pokemon.sprite;
    document.getElementById('opponent-pokemon-name').innerText = pokemon.name;
    opponentHPBox.innerText = opponentHP;
}

const getPokemon = async function() {
    const pokemonReq = await fetch('/pokemon');
    pokemonList = await pokemonReq.json();

    var select = document.getElementById('choose-your-pokemon');
    pokemonList.forEach(pokemon => {
        let option = document.createElement('option');
        option.text = pokemon.name;
        option.value = pokemon.name;
        select.add(option);
    });
}


// browser should read a word out loud
function readOutLoud(text) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.voice = voice;
    utterance.text = text;
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = function() {
        console.log('Start uttering');
    }
    utterance.onend = function() {
        console.log('End uttering');
    }
    utterance.onerror = function(e) {
        console.log(e);
    }
    synth.speak(utterance);
}


document.getElementById('choose-your-pokemon').onchange = function(e) {

    document.getElementById('winning').classList.remove('pyro');
    opponentHP = 100;

    let pokemon = pokemonList.find(p => p.name === e.target.value);
    document.getElementById('your-pokemon').src = pokemon.sprite;
    document.getElementById('your-pokemon-name').innerText = pokemon.name;
    yourHPBox.innerText = yourHP;

    init();

    document.getElementById('btn-next').click();
}


_ = getPokemon();