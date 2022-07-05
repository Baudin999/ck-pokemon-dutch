const synth = window.speechSynthesis;
let voice, pokemonList;
synth.onvoiceschanged = function() {
    let voices = synth.getVoices();
    // for (let i = 0; i < voices.length; i++) {
    //     if (voices[i].lang.startsWith('en')) {
    //         console.log(voices[i]);
    //     }
    //
    // }
    voice = voices.find(voice => { return voice.name === 'Oliver'; });
}


// load pikachu from the api
const init = async function() {
    let pikachu = await fetch('/pokemon/pikachu');
    let pikachuData = await pikachu.json();
    document.getElementById('pokemon-body').innerText = pikachuData.name;

    var img = document.createElement('img');
    img.src = pikachuData.sprites.front_default;
    document.getElementById('pokemon-body').appendChild(img);

    readOutLoud(pikachuData.name);
}

const getPokemon = async function() {
    const pokemonReq = await fetch('/pokemon');
    pokemonList = await pokemonReq.json();

    console.log(pokemonList.length);

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


document.getElementById('btn-start').onclick = function() {
    init();
}
document.getElementById('choose-your-pokemon').onchange = function(e) {
    let pokemon = pokemonList.find(p => p.name === e.target.value);
    var img = document.createElement('img');
    img.src = pokemon.sprite;
    document.body.appendChild(img);
}


_ = getPokemon();