//require dependencies
const express = require('express');
const pokemonList = require('./models/pokemon');
const port = 3000;
//initialize the express application
const app = express();

//configure database
const pokemons = require('./models/pokemon');

app.get('/', function(req, res){
    res.redirect('/pokemons');  //automatically goes to the pokemons link
});

app.get('/pokemons', function(req, res){
    res.send('working');
})

app.listen(port, function(){
    console.log(`Express is listening on port ${port}`);
})