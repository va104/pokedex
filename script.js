let currentPokemon;
let startPokemon = 0;
let endPokemon = 49;
let counter = 1;
let partOfPokemons = [];
let allPokemons = [];

async function loadPokemon() {
    for (let i = counter; (i <= endPokemon) && (i > startPokemon) && (i <= 900); i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        partOfPokemons.push(currentPokemon); 
    }
    renderPokemons(counter);
    counter = endPokemon + 1; //50
    startPokemon = endPokemon; //50
    endPokemon += 20; //70
}

async function searchPokemons(){
    for (let i = 1; i <= 900; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        partOfPokemons.push(allPokemons); 
    }   
}



function renderPokemons(counter){
    //own array has to start with one
    counter--;
    let pokemon = document.getElementById('containerAllPokemons');
    for (let i = counter; i < partOfPokemons.length; i++) {
        let name = partOfPokemons[i]['name'];
        let nameToUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
        let pokemonImg = partOfPokemons[i]['sprites']['other']['dream_world']['front_default'];
        let pokemonId = partOfPokemons[i]['id'];
        let pokemonType = partOfPokemons[i]['types'][0]['type']['name'];
        let bgColor = pokemonTypesAndColors.find(e => e.name == pokemonType)['color'];
        //String is needed for the comparision with length
        let pokemonIdStrg = pokemonId.toString();

        pokemon.innerHTML += HTMLrenderPokemons(i, pokemonImg, nameToUpperCase, pokemonIdStrg, bgColor);      
    }
}

function pokemonNumber(i){
    if(i.length == 1){
        return `#00${i}`
    }
    if(i.length == 2){
        return `#0${i}`
    } else{
        return `#${i}`
    }
}

function pokemonTypes(i){
    let pokemonTypesArray = partOfPokemons[i]['types'];
    let container = '';

    for (let j = 0; j < pokemonTypesArray.length; j++) {
        const type = pokemonTypesArray[j]['type']['name'];
        //background color type
        let colorType = pokemonTypesAndColors.find(e => e.name == type)['color'];
        container += /*html*/ `<img src="./img/types/${type}.png" alt="" style="background-color: ${colorType}">`;
    }
    return container;
}


