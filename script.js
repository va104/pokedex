let currentPokemon;
let currentSpecies;
let allPokemons = [];
let allSpecies = [];
let countTypes = 0;
let filterdPokemon = [];
let startLoadingRange = 0;
let endLoadingRange = 20;
let increaseRange = 20;
let pokemonLimit = 901;

async function loadPokemon() {
    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        if (i == 20) {
            renderPokemons();
        }
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}`
        let response2 = await fetch(url2);
        currentSpecies = await response2.json();
        allSpecies.push(currentSpecies)
    }
}


function renderPokemons(startPage) {
    let pokemonContainer = document.getElementById('containerAllPokemons');
    if (startPage) {
        //reset page and loading-Range 
        startLoadingRange = 0;
        endLoadingRange = 20;
        pokemonContainer.innerHTML = "";
        document.getElementById('loadMoreButton').classList.remove('d-none')
    }
    for (let i = startLoadingRange; i < endLoadingRange; i++) {
        contentPokemons(i, pokemonContainer, allPokemons);
    }
}

function contentPokemons(i, pokemonContainer) {
    let name = allPokemons[i]['name'];
    let nameToUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
    let pokemonImg = pokemonImgNullish(i);
    let pokemonId = allPokemons[i]['id'];
    let bgColor = backgroundColor(i, pokemonContainer);
    //String is needed for the comparision with length
    let pokemonIdStrg = pokemonId.toString();
    if (pokemonContainer.id == 'containerAllPokemons') {
        pokemonContainer.innerHTML += HTMLrenderPokemons(i, pokemonImg, nameToUpperCase, pokemonIdStrg, bgColor, pokemonContainer);
    }
    if (pokemonContainer.id == 'overlay-pokemon-container') {
        pokemonContainer.innerHTML = HTMLrenderPokemonOverlay(i, pokemonImg, nameToUpperCase, pokemonIdStrg, bgColor, pokemonContainer)
    }
}

function pokemonImgNullish(i) {
    //some img are null within the dream_world sprite --> take always the first match
    return (
        allPokemons[i]['sprites']['other']['dream_world']['front_default']
        ??
        allPokemons[i]['sprites']['other']['official-artwork']['front_default']
        ??
        allPokemons[i]['sprites']['other']['home']['front_default']
        ??
        "./img/pokeball.png"
    )
}

function pokemonNumber(i) {
    if (i.length == 1) {
        return `#00${i}`
    }
    if (i.length == 2) {
        return `#0${i}`
    } else {
        return `#${i}`
    }
}

function backgroundColor(i, container) {
    let bg1 = '';
    let bg2 = '';
    let bg3 = '';
    let pokemonTypesArray = allPokemons[i]['types'];
    for (let j = 0; j < pokemonTypesArray.length; j++) {
        const type = pokemonTypesArray[j]['type']['name'];
        if (pokemonTypesArray.length == 1) {
            bg1 = bg2 = bg3 = findColorinHex(type);
        }
        if (pokemonTypesArray.length == 2 && j == 0) {
            bg1 = findColorinHex(type)
            bg2 = findColorinHex(type)
        }
        if (pokemonTypesArray.length == 2 && j == 1) {
            bg3 = findColorinHex(type)
        }
    }
    if (container.id == 'containerAllPokemons') {
        return `background: linear-gradient(123deg, ${bg1} 0%, ${bg2} 45%, ${bg3} 100%);`
    }
    if (container.id == 'overlay-pokemon-container') {
        return `background: radial-gradient(circle, ${bg1} 0%, rgba(23,23,23,1) 88%);`
    }
}

function pokemonTypes(i, container) {
    let pokemonTypesArray = allPokemons[i]['types'];
    let dynamicContent = '';

    for (let j = 0; j < pokemonTypesArray.length; j++) {
        const type = pokemonTypesArray[j]['type']['name'];
        //background color type
        let colorType = pokemonTypesAndColors.find(e => e.name == type)['color'];
        if (container.id == 'containerAllPokemons') {
            dynamicContent += /*html*/ `
                <img onclick="searchForType('${type}')" src="./img/types/${type}.png" alt="" style="background-color: ${colorType}">
                `;
        }
        if (container.id == 'overlay-pokemon-container') {
            let color = findColorinHex(type);
            dynamicContent += /*html*/ `
                <div class="overlay-pokemon-type" style="border: 2px solid ${color}; color: ${color}">
                    ${type}
                </div>
            `;
        }
    }
    return dynamicContent;
};

function findColorinHex(type) {
    return pokemonTypesAndColors.find(
        e => e['name'] == type
    )['color']
}

function searchForType(type) {
    let pokemonContainer = document.getElementById('containerAllPokemons');
    document.getElementById('loadMoreButton').classList.add('d-none');
    pokemonContainer.innerHTML = '';

    filterdPokemon = allPokemons.filter(
        // if a pokemon has more than 1 type, boths types are important for filtering
        e => {
            if (e['types'].length == 1) {
                return e['types'][0]['type']['name'] == type
            }
            if (e['types'].length == 2) {
                return (e['types'][0]['type']['name'] == type || e['types'][1]['type']['name'] == type)
            }
        }
    );
    for (let i = 0; i < allPokemons.length; i++) {
        for (let j = 0; j < filterdPokemon.length; j++) {
            if (allPokemons[i]['id'] == filterdPokemon[j]['id']) {
                contentPokemons(i, pokemonContainer);
                countTypes++;
                window.scrollTo(0, 0);
            }
            if (countTypes == endLoadingRange) {
                break
            }
        }
        ;
    }

}

// window.addEventListener('scroll', () => {
//     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
//     const scrolled = window.scrollY;

//     if (Math.ceil(scrolled) === scrollable) {
//         //Abbruchbedingung wenn alle geladen sind
//         startLoadingRange = endLoadingRange;
//         endLoadingRange = endLoadingRange + increaseRange;
//         renderPokemons();
//     }
// });

function loadMorePokemons() {
    if ((pokemonLimit - increaseRange - 1) == endLoadingRange) {
        startLoadingRange = endLoadingRange;
        endLoadingRange = endLoadingRange + increaseRange;
        renderPokemons();
        document.getElementById('loadMoreButton').style.display = 'none';
    } else {
        startLoadingRange = endLoadingRange;
        endLoadingRange = endLoadingRange + increaseRange;
        renderPokemons();
    }
}

function loadTypeButtons() {
    let containerButtons = document.getElementById('allButtons');
    containerButtons.innerHTML = `<button>All Types</button>`;
    for (let i = 0; i < pokemonTypesAndColors.length; i++) {
        const type = pokemonTypesAndColors[i]['name'];
        const color = pokemonTypesAndColors[i]['color'];
        containerButtons.innerHTML += /*html*/ `
        <div class="pokemon-type">
            <img onclick="searchForType('${type}')" src="./img/types/${type}.png" alt="" style="background-color: ${color}">
        </div>
        `
    }
}

function toogleTypes() {
    let containerButtons = document.getElementById('allButtons');
    containerButtons.classList.toggle('d-none');
}

function openPokemonCard(i) {
    document.getElementById('coverForPokemonCard').classList.add('d-none');
    let container = document.getElementById('overlay-pokemon-container');
    container.classList.remove('d-none');
    contentPokemons(i, container);
    contentAboutSection(i);
}

function contentAboutSection(i) {
    activeNavElement(i);
    let dynamicAbilities = document.getElementById('overlay-dynamic-body');
    let flavorText = allSpecies[i]['flavor_text_entries'][91]['flavor_text'];
    let genera = allSpecies[i]['genera'][7]['genus'];
    let weight = allPokemons[i]['weight'] / 10;
    let height = allPokemons[i]['height'] / 10;
    let weightLbs = calcWeight(weight);
    let heightFt = calcHeight(height);
    dynamicAbilities.innerHTML = HTMLrenderPokemonAboutSection(flavorText, genera, weight, height, weightLbs, heightFt);
}

function contentStatsSection(i) {
    activeNavElement(i);
    let dynamicAbilities = document.getElementById('overlay-dynamic-body');
    dynamicAbilities.innerHTML = "";
}

function contentMovesSection(i) {
    activeNavElement(i);
    let dynamicAbilities = document.getElementById('overlay-dynamic-body');
    dynamicAbilities.innerHTML = "";
}

function calcWeight(weight) {
    return weight * 2.205
}

function calcHeight(height) {
    return height * 3.281
}

function activeNavElement(i) {
    let element = document.getElementById('navSection' + i);
    let allElements = document.getElementsByClassName('nav-menu');
    for (let i = 0; i < allElements.length; i++) {
        //remove class from every element
        allElements[i].classList.remove('chosenNavElement');
    }
    element.classList.add('chosenNavElement')
}