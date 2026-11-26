import type { Pokemon, PokemonType } from '#/components/pokedex/pokemon'

const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/pokemon`

interface ApiPokemon {
  id: string
  Pokemon: string
  HP: number
  Attack: number
  Defense: number
  Special_Attack: number
  Special_Defense: number
  Speed: number
  types: PokemonType[]
  image: string
}

function toPokemon(pokemon: ApiPokemon): Pokemon {
  return {
    id: pokemon.id,
    name: pokemon.Pokemon,
    image: pokemon.image,
    types: pokemon.types,
    stats: {
      hp: pokemon.HP,
      attack: pokemon.Attack,
      defense: pokemon.Defense,
      specialAttack: pokemon.Special_Attack,
      specialDefense: pokemon.Special_Defense,
      speed: pokemon.Speed,
    },
  }
}

export async function fetchPokemons(signal?: AbortSignal): Promise<Pokemon[]> {
  const response = await fetch(API_URL, { signal })

  if (!response.ok) {
    throw new Error(`Não foi possível carregar os Pokémon (${response.status}).`)
  }

  const payload: unknown = await response.json()
  if (!Array.isArray(payload)) {
    throw new Error('A API retornou uma lista de Pokémon inválida.')
  }

  return payload.map((pokemon) => toPokemon(pokemon as ApiPokemon))
}
