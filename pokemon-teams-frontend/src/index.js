const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const renderTrainers = () => {
    const mainBody = document.getElementsByTagName('main')[0]
    console.log(mainBody);
    
    return fetch(TRAINERS_URL).then(response => response.json()).then(data => data.forEach(trainer => {
        const ul = document.createElement('ul')
        trainer.pokemons.forEach(pokemon => {
            const li = document.createElement('li')
            li.innerHTML = `
                ${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            `
            ul.append(li)
        })

       const div = document.createElement('div')
        div.className = 'card'
        div.dataset.id = trainer.id
       div.innerHTML = `
       <p>${trainer.name}</p>
       <button data-button="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
       ${ul.outerHTML}
       `
        mainBody.append(div)
    }))
}

const releasePokemon = (pokemonId) => {
    const RELEASE_POKEMON_URL = `${POKEMONS_URL}/${pokemonId}`

    return fetch(RELEASE_POKEMON_URL, { method: 'DELETE' }).then(response => response.json());    
}

const addPokemon = (trainerId) => {
    addPokemonData = {
        nickname: 'Brando', 
        species: 'Bulbasaur', 
        'trainer_id': trainerId
    }

    configObj = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(addPokemonData)
    }

    return fetch(POKEMONS_URL, configObj).then(response => response.json()).then(data => console.log(data))
}

document.addEventListener('DOMContentLoaded', () => {
    renderTrainers()

    document.addEventListener('click', event => {
        
        switch (true) {
            case event.target.className === 'release':
                releasePokemon(event.target.dataset.pokemonId)
                location.reload()
                break
            case event.target.dataset.button === 'add-pokemon' && event.target.nextElementSibling.childNodes.length <6:
                addPokemon(event.target.parentNode.dataset.id)
                location.reload()
                break
        }
    })
})