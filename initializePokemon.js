let fs = require('fs');


// save the pokemon data as a json file to the pokedeck directory
function savePokemon(pokemonName, data) {
    const json = JSON.stringify(data, null, 4);
    fs.writeFileSync(`./pokedeck/${pokemonName}/${pokemonName}.json`, json);
}


// load the pokemon from the api
async function loadPokemon(name) {
    // check if the pokemon is already in the pokedeck directory
    if (fs.existsSync(`./pokedeck/${name}/${name}.json`)) {
        return JSON.parse(fs.readFileSync(`./pokedeck/${name}/${name}.json`));
    }

    else {
        // pokemon does not exist in the pokedeck directory
        return null;
    }
}

async function loadPokemonSprites(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${name}`);
    const data = await response.json();
    console.log(`Saving sprites for pokemon: ${name}`);
    if (data) {
        for (const key of Object.keys(data.sprites)) {
            if (data.sprites[key] !== null) {
                // download the sprite image and save it to the pokedeck directory
                const image = data.sprites[key];
                const imageResponse = await fetch(image);
                const imageData = await imageResponse.arrayBuffer();
                const imageBuffer = Buffer.from(imageData);
                fs.writeFileSync(`./pokedeck/${name}/${key}.png`, imageBuffer);
            }
            else {
                // the sprite is null, so don't download it
            }
        }
    }
    return null;
}

// get all the pokemon names from the pokedeck directory
function getPokemonNames() {
    let i = 0;
    const pokemon = fs.readdirSync('./pokedeck').map(name => {
        i++;
        return {
            name: name,
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
            sprite: `/pokedeck/${name}/front_default.png`
        };
    });
    console.log(pokemon.length + " --- " + i);
    return pokemon;
}





// load the pokemon from the api
async function loadPokemonById(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
        const name = data.name;

        console.log(`Saving pokemon: ${name}`);

        // if directory doesn't exist, create it
        if (!fs.existsSync(`./pokedeck/${name}`)) {
            fs.mkdirSync(`./pokedeck/${name}`);
        }

        await loadPokemonSprites(name);
        savePokemon(name, data);
        return data;
    }
}


module.exports = {
    getPokemon: loadPokemon,
    getPokemonNames: getPokemonNames,
};

async function downloadPokemon() {
    // delete pokedeck directory if it already exists
    if (fs.existsSync('./pokedeck')) {
        console.log('deleting pokedeck directory');
        fs.rmdirSync('./pokedeck', { recursive: true });
    }
    // create pokedeck directory
    fs.mkdirSync('./pokedeck');


    console.log('downloading pokemon');
    for (let i = 1; i < 150; i++) {
        console.log(`Loading pokemon: ${i}`);
        await loadPokemonById(i);
    }
    console.log('done downloading pokemon');
}
_ = downloadPokemon();

