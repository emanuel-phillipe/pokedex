import { TypeBadges } from './TypeBadges'
import { formatPokemonId, POKEMON_STATS } from './pokemon'
import type { Pokemon } from './pokemon'

interface ActivePokemonProps {
  pokemon: Pokemon
}

export function ActivePokemon({ pokemon }: ActivePokemonProps) {
  return (
    <section
      className="absolute bottom-16 left-1/2 z-[5] flex w-max -translate-x-1/2 items-center justify-between rounded-2xl border border-zinc-200 bg-white/90 p-8 shadow-[0_14px_45px_rgba(24,24,27,.07)] backdrop-blur-[18px]"
      aria-live="polite"
    >
      <div className="w-max flex flex-col items-center gap-4">
        <h2 className="m-0 text-2xl leading-none font-bold tracking-[-.055em] max-[720px]:text-[23px]">
          {pokemon.name}
        </h2>
        <TypeBadges types={pokemon.types} />
      </div>
    </section>
  )
}
