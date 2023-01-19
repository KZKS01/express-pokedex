//require dependencies
const express = require('express');
const pokemonList = require('./models/pokemon.js');
const port = 3000;
const methodOverride = require('method-override'); //origin line 5
//initialize the express application
const app = express();

//configure database
const pokemons = require('./models/pokemon.js');

//gives us access to a special object called req.body
//req.body is used to gather form input, anytime an input is submitted, it becomes req.body
//take info from form and update the form
app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method')); //invoking the methodOverride method, need line 5 to work
//this takes a special query parameter
//this way it knows which request needs to be overridden(in this case, any method that includes'_method')

//static middleware takes the line 9 in index.ejs go into "public" folder
app.use(express.static('public')); 

app.get('/', function(req, res){
    res.redirect('/pokemons');  //automatically goes to the pokemons link
});

//index - GET pokemon
app.get('/pokemons', function(req, res){
    res.render('index.ejs', {pokemonData: pokemons});
});

//new - GET /pokemons/new - send the user to a page with a form where thy can add a new pokemon
app.get('/pokemons/new', function(req, res){
    res.render('new.ejs', {
        title: 'Create a new Pokemon |'
    });
})

//delete - DELETE - /pokemons/:index
app.delete('/pokemons/:index', function(req, res){
    pokemonList.splice(req.params.index, 1);
    res.redirect('/pokemons');
})

//update - PUT /pokemons/:index
app.put('/pokemons/:index', function(req, res){
    pokemonList[req.params.index] = req.body;
    console.log(req.body);
    res.redirect('/pokemons');
})

//create - POST /pokemons - take form data and create a new pokemon with it
app.post('/pokemons', function(req, res){
    req.body.stats = {};
    req.body.stats.hp = req.body.hp;
    req.body.stats.attack = req.body.attack;
    req.body.stats.defense = req.body.defense;
    req.body.stats.spattack = req.body.spattack;
    req.body.stats.spdefense = req.body.spdefense;
    req.body.stats.speed = req.body.speed;
    pokemonList.push(req.body);
    console.log(req.body);
    res.redirect('/pokemons');
});

//edit - GET /pokemons/:index/edit - sending a page that allows a user to edit a pokemon
app.get('/pokemons/:index/edit', function(req, res){
    res.render('edit.ejs', {
       pokemonE: pokemonList[req.params.index],
       index: req.params.index, //to use in edit.ejs line 11 //original line 57
       title: 'Edit ' + pokemonList.name 
    });
});

//show - GET /pokemons/:someUniqueIndentifier
app.get('/pokemons/:index', function(req, res){
    const pokemon = pokemonList[req.params.index];
    res.render('show.ejs', {
        pokemon: pokemon,
        title: pokemons.name + 'details |' //page name
    });
});

app.listen(port, function(){
    console.log(`Express is listening on port ${port}`);
});