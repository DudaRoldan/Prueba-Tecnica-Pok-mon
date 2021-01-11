async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await response.json()
    return data
}

async function init() {
    const pokemon = await getPokemon()
    console.log(pokemon)
    updatePokemon(pokemon)
}
init() 

function updatePokemon(pokemon) {
    window.pokemon.textContent = pokemon.name
    window.image.setAttribute('src', pokemon.sprites.front_default)
    window.tipo.textContent = pokemon.types[0].type.name
}


window.search.addEventListener('change', async() => {
    const pokemon = await getPokemon(window.search.value)
    updatePokemon(pokemon)
})




const pokedex = document.getElementById('pokemons');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            height: result.height,
            weight: result.weight,
            base_experience: result.base_experience

        }));
        displayPokemon(pokemon);
    });
};


const displayPokemon = (pokemon) => {

    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <div class="card">
            <img class="image" src="${pokeman.image}"/>
            <h4 class="pokemon">${pokeman.id}. ${pokeman.name}</h2>
            <p class="tipo">Tipo: ${pokeman.type}</p>
            <div class="ver">
                <p>Ver más...</p>
            <div class="mas">
                <p class="tipo">Altura: ${pokeman.height}0 cm</p>
                <p class="tipo">Peso: ${pokeman.weight/10} kg</p>
                <p class="tipo">Experiencia base: ${pokeman.base_experience} pts</p> 
            </div>
            </div>             
        </div>
    `
        )


        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};


fetchPokemon();
