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
        "color": "#67be7d",
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
        "color": "#706b86",
    },
    {
        "name": "dark",
        "color": "#2f5760",
    },
    {
        "name": "fairy",
        "color": "#e584ac",
    },
    {
        "name": "shadow",
        "color": "#584732",
    },
    {
        "name": "unknown",
        "color": "#f3f3f3",
    }
]

function HTMLrenderPokemons(i, pokemonImg, nameToUpperCase, pokemonIdStrg, color){
    return /*html*/ `
    <div id="pokemonCard${i}" class="pokemon-card" style="background-color: ${color}">
    <div class="padding-pokemon-card d-flex">
        <img id="pokemon1"
            src=${pokemonImg} alt="">
        <div class="name-type">
            <span>${nameToUpperCase}</span>
            <div id="pokemonType${i}" class="pokemon-type">
                ${pokemonTypes(i)}
            </div>
        </div>
        <div class="pokemon-number">
            <span>${pokemonNumber(pokemonIdStrg)}</span>
        </div>
    </div>
</div>`
}