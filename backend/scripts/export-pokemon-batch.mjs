import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const sourcePath = resolve(scriptDirectory, '../../frontend/src/data/pokedex-data.json')
const outputPath = resolve(scriptDirectory, '../data/pokemon-batch.json')
const imageBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home'

const source = JSON.parse(await readFile(sourcePath, 'utf8'))

if (!Array.isArray(source.pokemon)) {
  throw new Error('O arquivo de origem não possui uma lista "pokemon".')
}

const statNames = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed']

const pokemonRequestList = source.pokemon.map((pokemon) => {
  if (!Number.isInteger(pokemon.id) || pokemon.id <= 0 || typeof pokemon.name !== 'string') {
    throw new Error(`Pokémon inválido: ${JSON.stringify(pokemon)}`)
  }

  if (!pokemon.stats || !statNames.every((stat) => Number.isInteger(pokemon.stats[stat]))) {
    throw new Error(`Atributos inválidos para ${pokemon.name}.`)
  }

  if (!Array.isArray(pokemon.types) || !pokemon.types.every((type) => typeof type.name === 'string')) {
    throw new Error(`Tipos inválidos para ${pokemon.name}.`)
  }

  return {
    Pokemon: pokemon.name,
    HP: pokemon.stats.hp,
    Attack: pokemon.stats.attack,
    Defense: pokemon.stats.defense,
    Special_Attack: pokemon.stats.specialAttack,
    Special_Defense: pokemon.stats.specialDefense,
    Speed: pokemon.stats.speed,
    typesName: pokemon.types.map((type) => type.name),
    image: `${imageBaseUrl}/${pokemon.id}.png`,
  }
})

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify({ pokemonRequestList }, null, 2)}\n`)

console.log(`Exportados ${pokemonRequestList.length} Pokémon para ${outputPath}`)
