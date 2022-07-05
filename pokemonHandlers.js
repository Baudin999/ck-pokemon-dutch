let fs = require('fs');



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


module.exports = {
    getPokemon: loadPokemon,
    getPokemonNames: getPokemonNames,
};
