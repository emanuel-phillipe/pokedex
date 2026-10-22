import { TypeBadges } from './TypeBadges'
import { formatPokemonId, POKEMON_STATS } from './pokemon'
import type { Pokemon } from './pokemon'

interface ActivePokemonProps {
  pokemon: Pokemon
}

export function ActivePokemon({ pokemon }: ActivePokemonProps) {
  return (
    <section
      className="absolute right-[clamp(24px,4.5vw,70px)] bottom-[25px] left-[clamp(24px,4.5vw,70px)] z-[5] flex min-h-28 items-center justify-between gap-8 rounded-xl border border-zinc-200 bg-white/90 px-6 py-5 shadow-[0_14px_45px_rgba(24,24,27,.07)] backdrop-blur-[18px] max-[1000px]:items-start max-[720px]:right-3 max-[720px]:bottom-3 max-[720px]:left-3 max-[720px]:min-h-[150px] max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:gap-[13px] max-[720px]:p-[15px]"
      aria-live="polite"
    >
      <div className="grid min-w-[280px] grid-cols-[auto_auto_1fr] items-center gap-3 max-[1000px]:min-w-[210px] max-[1000px]:grid-cols-[auto_1fr] max-[1000px]:[&>div]:col-span-full max-[720px]:flex max-[720px]:min-w-0 max-[720px]:flex-wrap">
        <span className="text-[10px] font-extrabold tracking-[.11em] text-zinc-400">
          {formatPokemonId(pokemon.id)}
        </span>
        <h2 className="m-0 border-r border-zinc-200 pr-3.5 text-[28px] leading-none font-bold tracking-[-.055em] max-[720px]:text-[23px]">
          {pokemon.name}
        </h2>
        <TypeBadges types={pokemon.types} />
      </div>
      <div className="grid grid-cols-[repeat(6,minmax(54px,74px))] max-[1000px]:grid-cols-[repeat(3,64px)] max-[1000px]:gap-y-[9px] max-[1000px]:[&>div:nth-child(4)]:border-l-0 max-[720px]:grid-cols-6 max-[720px]:[&>div:nth-child(4)]:border-l max-[480px]:grid-cols-3 max-[480px]:gap-y-[9px] max-[480px]:[&>div:nth-child(4)]:border-l-0">
        {POKEMON_STATS.map(({ key, shortLabel }) => (
          <div className="flex min-w-0 flex-col gap-1 border-l border-zinc-200 px-[15px] py-0.5 max-[720px]:px-[7px]" key={key}>
            <span className="text-[8px] font-[850] tracking-[.08em] text-zinc-400">{shortLabel}</span>
            <strong className="text-sm">{pokemon.stats[key]}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
