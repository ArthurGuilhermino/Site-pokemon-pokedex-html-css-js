//Menu da pagina principal.
let icon = document.querySelector("#icon");
let nav = document.querySelector("#nav");

function openMenu() {
    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
}

//pokeagenda
const pokemonName = document.querySelector(".pokemonName");
const pokemonId = document.querySelector(".pokemonNumber");
const pokemonImg = document.querySelector(".pokemonImagem");
const pokemonMove = document.querySelector(".pokemonMove");

const formulario = document.querySelector(".form");
const input = document.querySelector(".inputSearch");

const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");

searchPokemon = 1;

const fetchPokemon = async (idPokemon) => {
    pokemonName.innerHTML = "Carregando.. ↺";

    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    }
};

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonMove.innerHTML = " ";
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImg.style.display = "block";
        pokemonImg.src =
            data.sprites.versions["generation-v"]["black-white"].animated[
                "front_default"
            ];

        searchPokemon = data.id;
        input.value = "";

        const numberPoke = 10;
        for (i = 0; i <= numberPoke; i++) {
            pokemonMove.innerHTML += data.moves[i].move.name + " ↔ ";
        }
    } else {
        pokemonName.innerHTML = "Não encontrado ☹";
        pokemonId.innerHTML = "";
        pokemonImg.style.display = "none";
    }
};

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        --searchPokemon;
        renderPokemon(searchPokemon);
    }
});

next.addEventListener("click", () => {
    if (searchPokemon >= 649) {
        searchPokemon = 649;
    } else {
        ++searchPokemon;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);
