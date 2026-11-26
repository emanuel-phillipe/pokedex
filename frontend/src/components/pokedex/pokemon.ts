export interface PokemonType {
  id: string
  name: string
}

export interface Pokemon {
  id: string
  name: string
  image: string
  types: PokemonType[]
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
}

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
