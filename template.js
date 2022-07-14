let pokemonTypesAndColors = [
    // Name is the same like the img-name
    {
        "name": "normal",
        "color": "#b4aa96",
    },
    {
        "name": "fighting",
        "color": "#8d785f",
    },
    {
        "name": "flying",
        "color": "#92caeb",
    },
    {
        "name": "poison",
        "color": "#ab6fff",
    },
    {
        "name": "ground",
        "color": "#d29637",
    },
    {
        "name": "rock",
        "color": "#b6a48a",
    },
    {
        "name": "bug",
        "color": "#a5c86f",
    },
    {
        "name": "ghost",
        "color": "#2f4e6f",
    },
    {
        "name": "steel",
        "color": "#b7b7b3",
    },
    {
        "name": "fire",
        "color": "#f64040f2",
    },
    {
        "name": "water",
        "color": "#559de1",
    },
    {

        "name": "grass",
        "color": "#41af5d",
    },
    {
        "name": "electric",
        "color": "#ebbf1c",
    },
    {
        "name": "psychic",
        "color": "#cd7394",
    },
    {
        "name": "ice",
        "color": "#bfe0f3",
    },
    {
        "name": "dragon",
        "color": "#3e307c",
    },
    {
        "name": "dark",
        "color": "#2f5760",
    },
    {
        "name": "fairy",
        "color": "#e584ac",
    },
]

function HTMLrenderPokemons(i, pokemonImg, nameToUpperCase, pokemonIdStrg, color, pokemonContainer){
    return /*html*/ `
    <div id="pokemonCard${i}" class="pokemon-card" onclick="openPokemonCard(${i})" style="${color}">
    <div class="padding-pokemon-card d-flex">
        <img class="pokemon-img"
            src=${pokemonImg} alt="">
        <div class="name-type">
            <span>${nameToUpperCase}</span>
            <div id="pokemonType${i}" class="pokemon-type">
                ${pokemonTypes(i, pokemonContainer)}
            </div>
        </div>
        <div class="pokemon-number">
            <span>${pokemonNumber(pokemonIdStrg)}</span>
        </div>
    </div>
</div>`
}

function HTMLrenderPokemonOverlay(i, pokemonImg, nameToUpperCase, pokemonIdStrg, color, pokemonContainer){
    return /*html*/ `
    <div class="overlay-top-pokemon" style="${color}">
            <img class="back-to-menu" src="./img/cross.png" alt="BackToMenu">
            <div class="overlay-header">
                <img class="scaleArrow" src="./img/arrowLeft.png" alt="ArrowLeft">
                <div class="overlay-pokemon-name">
                    <span>${nameToUpperCase}</span>
                    <span>${pokemonNumber(pokemonIdStrg)}</span>
                </div>
                <img class="scaleArrow arrowRight" src="./img/arrowLeft.png" alt="ArrowRight">
            </div>
        </div>
        <div class="overlay-bottom-pokemon">
            <img class="pokemon-overlay-img"
                src=${pokemonImg} alt="">
            <div class="nav-pokemon-container">
                <div class="overlay-pokemon-types-container">
                    ${pokemonTypes(i, pokemonContainer)}                 
                </div>
                <div class="nav-menu-container">
                    <div id="navSection1" class="nav-menu" onclick="contentAboutSection(1)">About</div>
                    <div id="navSection2" class="nav-menu" onclick="contentStatsSection(2)">Stats</div>
                    <div id="navSection3" class="nav-menu" onclick="contentMovesSection(3)">Moves</div>
                </div>
                <div id="overlay-dynamic-body" class="overlay-dynamic-body">
                </div>
            </div>
        </div>
    `
}

function HTMLrenderPokemonAboutSection(flavorText, genera, weight, height, weightLbs, heightFt){
    return /*html*/ `
    <div class="pokemon-description">
        <span>${flavorText}</span>
    </div>
    <div class="pokemon-all-abouts">
        <div class="abouts-categories">
            <div class="abouts-header">
                <img src="./img/leaf.png" alt="Species">
                <p>species</p>
            </div>
            <div class="abouts-body">
                <span>${genera}</span>
            </div>
        </div>
        <div class="abouts-categories border-left">
            <div class="abouts-header">
                <img src="./img/weight.png" alt="Weight">
                <p>weight</p>
            </div>
            <div class="abouts-body">
                <span>${weight}kg</span>
                &nbsp|&nbsp 
                <span>${weightLbs}lbs</span>
            </div>
        </div>
        <div class="abouts-categories border-left">
            <div class="abouts-header">
                <img src="./img/height.png" alt="Height">
                <p>height</p>
            </div>
            <div class="abouts-body">
                <span>${height}m</span>
                &nbsp|&nbsp 
                <span>${heightFt}ft</span>
            </div>
        </div>
    </div>
    `
}



// stats
// <div class="pokemon-stats-container">
//                         <div class="stats">
//                             <p>HP</p>
//                             <p><b>40</b></p>
//                             <div class="stat-statusbar">
//                                 <div class="single-stat"></div>
//                             </div>
//                         </div>
//                         <div class="stats">
//                             <p>Attack</p>
//                             <p><b>40</b></p>
//                             <div class="stat-statusbar">
//                                 <div class="single-stat"></div>
//                             </div>
//                         </div>
//                         <div class="stats">
//                             <p>Defense</p>
//                             <p><b>40</b></p>
//                             <div class="stat-statusbar">
//                                 <div class="single-stat"></div>
//                             </div>
//                         </div>
//                         <div class="stats">
//                             <p>Special-Attack</p>
//                             <p><b>40</b></p>
//                             <div class="stat-statusbar">
//                                 <div class="single-stat"></div>
//                             </div>
//                         </div>
//                         <div class="stats">
//                             <p>Special-Defense</p>
//                             <p><b>40</b></p>
//                             <div class="stat-statusbar">
//                                 <div class="single-stat"></div>
//                             </div>
//                         </div>
//                         <div class="stats">
//                             <p>Speed</p>
//                             <p><b>40</b></p>
//                             <div class="stat-statusbar">
//                                 <div class="single-stat"></div>
//                             </div>
//                         </div>
//                         <div class="stats">
//                             <p><b>Total</b></p>
//                             <p><b>100</b></p>
//                         </div>
//                     </div>


// moves
// <div class="moves-container">
// <div class="move">Vine-Whop</div>
// </div>

