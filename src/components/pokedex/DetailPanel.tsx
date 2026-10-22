import { X } from 'lucide-react'

import { TypeBadges } from './TypeBadges'
import { formatPokemonId, POKEMON_STATS } from './pokemon'
import type { Pokemon } from './pokemon'

interface DetailPanelProps {
  pokemon: Pokemon
  onClose: () => void
}

export function DetailPanel({ pokemon, onClose }: DetailPanelProps) {
  return (
    <aside
      className="absolute top-1/2 right-[clamp(24px,4.5vw,70px)] z-[8] flex h-max w-[min(40vw,500px)] -translate-y-1/2 flex-col justify-center rounded-[14px] border border-zinc-300 bg-white/95 p-[clamp(34px,4vw,58px)] shadow-[0_28px_80px_rgba(24,24,27,.15)] backdrop-blur-[20px] max-[1000px]:right-6 max-[1000px]:w-[46vw] max-[720px]:right-3 max-[720px]:left-3 max-[720px]:max-h-[44vh] max-[720px]:w-auto max-[720px]:justify-start max-[720px]:overflow-y-auto max-[720px]:rounded-xl max-[720px]:px-6 max-[720px]:pt-8 max-[720px]:pb-[23px]"
      aria-label={`Detalhes de ${pokemon.name}`}
    >
      <div className="mt-4 mb-8 flex items-center flex-col justify-between gap-[15px] max-[720px]:mt-[11px]">
        <h2 className="m-0 min-w-0 text-[clamp(38px,4vw,58px)] leading-[.95] font-medium tracking-[-.065em] [overflow-wrap:anywhere] max-[720px]:text-4xl">
          {pokemon.name}
        </h2>
        <TypeBadges types={pokemon.types} />
      </div>

      <div className="border-t border-zinc-200">
        {POKEMON_STATS.map(({ key, label }) => (
          <div
            className="grid min-h-[53px] grid-cols-[minmax(92px,1fr)_32px_1.3fr] items-center gap-4 border-b border-zinc-200/80 max-[720px]:min-h-[42px]"
            key={key}
          >
            <span className="text font-semibold text-zinc-600">{label}</span>
            <strong className="text-right text">{pokemon.stats[key]}</strong>
            <i className="block h-1 w-full overflow-hidden rounded-full bg-zinc-200" aria-hidden="true">
              <i
                className="block h-full origin-left rounded-[inherit] bg-red-600 transition-[width] duration-700"
                style={{ width: `${Math.min((pokemon.stats[key] / 160) * 100, 100)}%` }}
              />
            </i>
          </div>
        ))}
      </div>
    </aside>
  )
}
