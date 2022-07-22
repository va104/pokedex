let currentPokemon;
let currentSpecies;
let allPokemons = [];
let allSpecies = [];
let filterdPokemon = [];
let startLoadingRange = 0;
let endLoadingRange = 20;
let increaseRange = 20;
let pokemonLimit = 801;
let AboutSectionOn = 0;
let StatsSectionOn = 0;
let MoveSectionOn = 0;
let arrayStats = [];

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
    if ((pokemonContainer.id == 'searchedPokemons') || (pokemonContainer.id == 'containerAllPokemons')) {
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
    if ((container.id == 'searchedPokemons') || (container.id == 'containerAllPokemons')) {
        return `background: linear-gradient(123deg, ${bg1} 0%, ${bg2} 45%, ${bg3} 100%);`
    }
    if (container.id == 'overlay-pokemon-container') {
        return `background: radial-gradient(circle, ${bg1} 0%, rgba(23,23,23,1) 88%);`
    }
    if (container == 'statsBackground') {
        return `background-color: ${bg1};`
    }
    else {
        return `box-shadow: 0 0px 5px 0 ${bg1} inset, 0 0px 5px 0 ${bg1} inset, 0 0px 15px 0 ${bg1} inset, 0 0px 5px 0 ${bg1};`
    }
}

function pokemonTypes(i, container) {
    let pokemonTypesArray = allPokemons[i]['types'];
    let dynamicContent = '';

    for (let j = 0; j < pokemonTypesArray.length; j++) {
        const type = pokemonTypesArray[j]['type']['name'];
        //background color type
        let colorType = pokemonTypesAndColors.find(e => e.name == type)['color'];
        if ((container.id == 'searchedPokemons') || (container.id == 'containerAllPokemons')) {
            dynamicContent += /*html*/ `
                <img onclick="searchForType('${type}'), event.stopPropagation()" src="./img/types/${type}.png" alt="" style="background-color: ${colorType}">
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
    arrayFilterdPokemons(type) ;
    loadFilteredPokemons(pokemonContainer, filterdPokemon);
}

function arrayFilterdPokemons(type){
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
    return filterPokemon;
}

function loadFilteredPokemons(pokemonContainer, filterdPokemon){
    // let countTypes = 0;
    for (let i = 0; i < allPokemons.length; i++) {
        for (let j = 0; j < filterdPokemon.length; j++) {
            if (allPokemons[i]['id'] == filterdPokemon[j]['id']) {
                contentPokemons(i, pokemonContainer);
                // countTypes++;
                window.scrollTo(0, 0);
            }
            // if (countTypes == endLoadingRange) {
            //     break
            // }
        }
    }
}

function loadMoreFilterdPokemons() {
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
    containerButtons.innerHTML = `
    <div class="pokemon-type">
        <img onclick="renderPokemons('startPage')" src="./img/types_arrow.png" alt="Arrow">
    </div>
    `;
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
    document.getElementById('inputSearchbar-resp').classList.add('d-none')
    if(containerButtons.classList.contains('d-none')){
        window.scrollTo(0, 0);
    }
    containerButtons.classList.toggle('d-none');
}

function openPokemonCard(i) {
    window.scrollTo(0, 0);
    document.getElementById('coverForPokemonCard').classList.add('d-none');
    let container = document.getElementById('overlay-pokemon-container');
    container.classList.remove('d-none');
    contentPokemons(i, container);
    contentAboutSection('1' + i, i);
}

function contentAboutSection(container, i) {
    //use this variable for switching between the Pokemon Sections
    AboutSectionOn = 1;
    StatsSectionOn = MoveSectionOn = 0;

    activeNavElement(container);
    let dynamicAbilities = document.getElementById('overlay-dynamic-body');
    let flavorText = EngFlavorText(i);
    let genera = allSpecies[i]['genera'][7]['genus'];
    let weight = allPokemons[i]['weight'] / 10;
    let height = allPokemons[i]['height'] / 10;
    let weightLbs = calcWeight(weight);
    let heightFt = calcHeight(height);
    dynamicAbilities.innerHTML = HTMLrenderPokemonAboutSection(i, flavorText, genera, weight, height, weightLbs, heightFt);
}


function contentStatsSection(container, i) {
    //use this variable for switching between the Pokemon Sections
    StatsSectionOn = 1;
    AboutSectionOn = MoveSectionOn = 0;

    activeNavElement(container);
    let dynamicAbilities = document.getElementById('overlay-dynamic-body');
    dynamicAbilities.innerHTML = "";
    let hp = allPokemons[i]['stats'][0]['base_stat'];
    let attack = allPokemons[i]['stats'][1]['base_stat'];
    let defense = allPokemons[i]['stats'][2]['base_stat'];
    let specialAttack = allPokemons[i]['stats'][3]['base_stat'];
    let specialDefense = allPokemons[i]['stats'][4]['base_stat'];
    let speed = allPokemons[i]['stats'][5]['base_stat'];
    let total = sumStats(hp, attack, defense, specialAttack, specialDefense, speed);
    arrayStats = [];
    arrayStats.push(hp, attack, defense, specialAttack, specialDefense, speed)
    dynamicAbilities.innerHTML = HTMLrenderPokemonStatsSection(i, hp, attack, defense, specialAttack, specialDefense, speed, total);
    bgColorHighestStat(i, arrayStats);
}

function contentMovesSection(container, i) {
    //use this variable for switching between the Pokemon Sections
    MoveSectionOn = 1;
    AboutSectionOn = StatsSectionOn = 0;
    activeNavElement(container);
    let dynamicAbilities = document.getElementById('overlay-dynamic-body');
    dynamicAbilities.innerHTML = "";
    dynamicAbilities.innerHTML = HTMLrenderPokemonMovesSection(i);
}

function calcWeight(weight) {
    return Math.round(weight * 2.205)
}

function calcHeight(height) {
    return Math.round(height * 3.281)
}

function sumStats(hp, attack, defense, specialAttack, specialDefense, speed) {
    return (hp + attack + defense + specialAttack + specialDefense + speed)
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

function pokemonMoves(i) {
    let element = allPokemons[i]['moves'];
    let dynamicContent = "";
    for (let j = 0; j < element.length; j++) {
        let moves = element[j]['move']['name'];
        dynamicContent +=  /*html*/ `
            <div class="move" style="${backgroundColor(i, 'noContainer')}">
        ${moves}
    </div>
        `;
    }
    return dynamicContent
}

function styleStatusBar(i, stat1, stat2, stat3, stat4, stat5, stat6) {
    let lengthOfBar = Math.round(stat1 * 100 / 255);
    let arrayAllStatus = [];
    arrayAllStatus.push(stat1, stat2, stat3, stat4, stat5, stat6);
    let resultInt = arrayAllStatus.map((e) => {
        return parseInt(e);
    });
    let maxValue = Math.max.apply(null, resultInt);
    resultInt.sort();

    if (stat1 == maxValue) {
        let dynamicContent = '';
        dynamicContent += `width: ${lengthOfBar}%; ${backgroundColor(i, 'statsBackground')}; ${backgroundColor(i, 'no-contaienr')}`;
        return dynamicContent
    }
    else {
        return `width: ${lengthOfBar}%; background-color: #dfdfdf`
    }
};

function bgColorHighestStat(i, arrayStats) {
    let divStatusBar = document.getElementsByClassName('stat-statusbar');
    let resultInt = arrayStats.map((e) => {
        return parseInt(e);
    });
    let maxValue = Math.max.apply(null, resultInt);
    //find multiple elements with the same value for the divStatusBar
    for (let j = 0; j < arrayStats.length; j++) {
        if (arrayStats[j] === maxValue) {
            // indexesMaxValue.push(j);
            divStatusBar[j].style = `${backgroundColor(i, 'noContainer')}`
        }
    }
}

function nextPokemon(i) {
    let container = document.getElementById('overlay-pokemon-container');
    if (i == -1) {
        // i = pokemonLimit - 2;
        i = allPokemons.length - 1
        contentPokemons(i, container);
        choseRightSection(i);
    }
    if (i == pokemonLimit - 1) {
        i = 0
        contentPokemons(i, container);
        choseRightSection(i);
    }
    else {
        contentPokemons(i, container);
        choseRightSection(i);
    }
}

function closePokemon() {
    document.getElementById('coverForPokemonCard').classList.remove('d-none');
    document.getElementById('overlay-pokemon-container').classList.add('d-none');
}

function EngFlavorText(i) {
    // always take the first english match and filter the special character
    let flavorArray = allSpecies[i]['flavor_text_entries']
    for (let i = 0; i < flavorArray.length; i++) {
        let flavorText = flavorArray[i]['flavor_text'];
        let flavorLanguage = flavorArray[i]['language']['name'];
        if (flavorLanguage == 'en') {
            let result = flavorText.replace(/\f/gi, ' ')
            return result;
        }
    }
}

function choseRightSection(i) {
    if (AboutSectionOn == 1) {
        contentAboutSection('1' + i, i);
    } else if (StatsSectionOn == 1) {
        contentStatsSection('2' + i, i);
    } else if (MoveSectionOn == 1) {
        contentMovesSection('3' + i, i);
    }
}

function activeSearchBar() {
    let activeSearch = document.getElementById('inputSearchbar');
    activeSearch.classList.add('input-searchbar-fixed');
    let activeSearchResp = document.getElementById('inputSearchbar-resp');
    activeSearchResp.classList.add('input-searchbar-fixed');
}

function checkedClick() {
    let specifiedElement = document.getElementById('inputSearchbar');
    let specifiedElementResp = document.getElementById('inputSearchbar-resp');
    if(specifiedElement.classList.contains('d-none')){
        checkedClickEventListener(specifiedElement);
    } else{
        checkedClickEventListener(specifiedElementResp);
    };
}

function checkedClickEventListener(element){
    document.addEventListener("click", (event) => {
        let isClickedInside = element.contains(event.target);

        if (!isClickedInside) {
            element.classList.remove('input-searchbar-fixed')
        }
    })
}

let Timeout = setTimeout(checkedClick, 2000);

function closeToggleTypes(){
    let containerButtons = document.getElementById('allButtons');
    containerButtons.classList.add('d-none');
}

function SearchbarfilterPokemon() {
    let pokemonContainer = document.getElementById('searchedPokemons');
    pokemonContainer.innerHTML = '';
    document.getElementById('containerAllPokemons').classList.add('d-none');
    document.getElementById('loadMoreButton').classList.add('d-none');
    document.getElementById('filterBar').style = 'visibility:hidden';
    let search = document.getElementById('inputText').value.toLowerCase();
    let searchResp = document.getElementById('inputText-resp').value.toLowerCase();
    let RespSearchbar = document.getElementById('inputSearchbar-resp')
    let counter = 0;
    if(!RespSearchbar.classList.contains('d-none')){
        filterPokemon(searchResp, counter, pokemonContainer);
    } else{
        filterPokemon(search, counter, pokemonContainer);
    }
}

function filterPokemon(search, counter, pokemonContainer){
    for (let i = 0; i < allPokemons.length; i++) {
        let nameEN = allPokemons[i]['name'];
        let nameDE = allSpecies[i]['names'][5]['name'];
        let id = allPokemons[i]['id'];
        if (nameEN.toLowerCase().includes(search) || nameDE.toLowerCase().includes(search) || id == search) {
            contentPokemons(i, pokemonContainer);
            counter++;
        }
        //too much if every Pokemon would be loaded
        if (counter == 20) {
            break;
        }
    }
    // if the value is empty, all Pokemons should be visible
    if (search == ''){
        goBackToNormalView();
    }
}

function goBackToNormalView(){
    let pokemonContainer = document.getElementById('searchedPokemons'); 
    let search = document.getElementById('inputText');
    let searchResp = document.getElementById('inputText-resp');
    search.value = '';
    searchResp.value = '';
    pokemonContainer.innerHTML = '';
    document.getElementById('containerAllPokemons').classList.remove('d-none');
    document.getElementById('loadMoreButton').classList.remove('d-none');
    document.getElementById('filterBar').style = 'visibility: visible';
}

function showRespSearchbar(){
    if (window.innerWidth <= 500){
        let containerButtons = document.getElementById('allButtons');
        containerButtons.classList.add('d-none');
        document.getElementById('inputSearchbar-resp').classList.toggle('d-none');
    }
}
