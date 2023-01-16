//require dependencies
const express = require('express');
const port = 3000;
//initialize the express application
const app = express();

//configure database
const pokemons = require('./models/pokemon.js');

app.get('/', function(req, res){
    res.redirect('/pokemons');  //automatically goes to the pokemons link
});

//index - GET pokemon
app.get('/pokemons', function(req, res){
    res.render('index.ejs', {pokemonData: pokemons});
})

//new - GET /pokemons/new - send the user to a page with a form where thy can add a new pokemon

//delete - DELETE - /pokemons/:index

//update - PUT /pokemons/:index

//create - POST /pokemons - take form data and create a new pokemon with it

//edit - GET /pokemons/:index/edit - sending a page that allows a user to edit a pokemon

//show - GET /pokemons/:someUniqueIndentifier

app.listen(port, function(){
    console.log(`Express is listening on port ${port}`);
})