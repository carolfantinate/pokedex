const input = document.getElementById('inputPokemon')
const btn = document.getElementById('btnBuscar')
const resultado = document.getElementById('resultado')

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        buscarPokemon()
    }
})

btn.addEventListener('click', buscarPokemon)

function buscarPokemon() {
    const nomePokemon = input.value
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
        .then(res => res.json())
        .then(pokemon => {
            const imagem = pokemon.sprites.front_default
            const tipos = pokemon.types.map(t => t.type.name).join(", ")
            const habilidades = pokemon.abilities.map(a => a.ability.name).join(", ")

            resultado.innerHTML = `
            <div class=card>
                <h2>${pokemon.name}</h2>
                <p id="numero"><strong>Número: </strong> #${pokemon.id}</p>
                <img src="${imagem}">
                <p><strong>Tipo:</strong> ${tipos}</p>
                <p><strong>Altura:</strong> ${pokemon.height}</p>
                <p><strong>Peso:</strong> ${pokemon.weight}</p>
                <p><strong>Habilidades:</strong> ${habilidades}</p>
            </div>
        `
        })

        .catch(() => {
            resultado.innerHTML = 'Pokemon não encontrado!'
        })
}