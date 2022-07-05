const express  = require('express');
const app = express();
const { getPokemon, getPokemonNames } = require('../pokemonHandlers');

// add the pokedeck as a static folder
app.use('/pokedeck', express.static('./pokedeck'));

// create a simple express server which will listen on port 3000
// and will serve the HTML file located in the public folder
app.use(express.static('./server/public'));



// get pikachu from the pokedeck
app.get('/pokemon/:name', async (req, res) => {
    let name = req.params['name'];
    res.json(await getPokemon(name));
});


app.get('/pokemon', (req, res) => {
    res.json(getPokemonNames());
});


app.listen(3000, () => {
    console.log('application running on: http://localhost:3000/')
})