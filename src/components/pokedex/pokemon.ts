import pokedexData from '#/data/pokedex-data.json'

export type Pokemon = (typeof pokedexData.pokemon)[number]
export type PokemonStatKey = keyof Pokemon['stats']

export const POKEMON_STATS: Array<{
  key: PokemonStatKey
  label: string
  shortLabel: string
}> = [
  { key: 'hp', label: 'HP', shortLabel: 'HP' },
  { key: 'attack', label: 'Attack', shortLabel: 'ATK' },
  { key: 'defense', label: 'Defense', shortLabel: 'DEF' },
  { key: 'specialAttack', label: 'Special Attack', shortLabel: 'SP. ATK' },
  { key: 'specialDefense', label: 'Special Defense', shortLabel: 'SP. DEF' },
  { key: 'speed', label: 'Speed', shortLabel: 'SPD' },
]

export const pokemonImageUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

export const formatPokemonId = (id: number) => `ID ${String(id).padStart(3, '0')}`
