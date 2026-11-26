import { ChevronDown, Search, X } from 'lucide-react'

interface PokedexHeaderProps {
  availableTypes: string[]
  query: string
  resultCount: number
  selectedType: string
  totalCount: number
  onQueryChange: (query: string) => void
  onTypeChange: (type: string) => void
}

export function PokedexHeader({
  availableTypes,
  query,
  resultCount,
  selectedType,
  totalCount,
  onQueryChange,
  onTypeChange,
}: PokedexHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 grid h-[86px] grid-cols-[1fr_minmax(380px,610px)_1fr] items-center gap-7 border-b border-zinc-200 bg-white/95 px-[clamp(24px,4.5vw,70px)] backdrop-blur-2xl max-[1000px]:grid-cols-[auto_1fr_auto] max-[720px]:h-[132px] max-[720px]:grid-cols-[1fr_auto] max-[720px]:grid-rows-[auto_auto] max-[720px]:gap-[11px] max-[720px]:px-5 max-[720px]:py-[15px]">
      <a
        href="/"
        className="inline-flex items-center gap-[11px] justify-self-start text-3xl font-[820] tracking-[-.05em] text-zinc-900 no-underline"
        aria-label="UltraDéx — início"
      >
        <span
          className="grid size-[30px] place-items-center rounded-full border-2 border-zinc-900 bg-[linear-gradient(#e22c39_0_46%,#18181b_46%_54%,#f4f4f5_54%)]"
          aria-hidden="true"
        >
          <span className="size-[9px] rounded-full border-2 border-zinc-900 bg-white" />
        </span>
        <span><strong className="text-[#d82532]">Ultra</strong>Déx</span>
      </a>

      <div className="grid grid-cols-[1fr_170px] gap-[9px] max-[720px]:col-span-full max-[720px]:w-full max-[720px]:grid-cols-[1fr_145px] max-[480px]:grid-cols-[1fr_125px]">
        <label className="flex min-h-[43px] items-center gap-3 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-500 transition-[border-color,box-shadow] focus-within:border-[#225bc0] focus-within:shadow-[0_0_0_3px_rgba(34,91,192,.09)] max-[480px]:px-2.5">
          <Search className="shrink-0" size={22} aria-hidden="true" />
          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-zinc-800 outline-none placeholder:text-zinc-400"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Pesquisar Pokémon..."
            aria-label="Pesquisar Pokémon por nome ou ID"
          />
          {query && (
            <button
              className="grid size-[25px] shrink-0 place-items-center rounded-full border-0 bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200"
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Limpar pesquisa"
            >
              <X size={15} />
            </button>
          )}
        </label>
        <label className="flex min-h-[43px] items-center gap-[9px] rounded-lg border border-zinc-300 bg-white px-[13px] text-zinc-500 transition-[border-color,box-shadow] focus-within:border-[#225bc0] focus-within:shadow-[0_0_0_3px_rgba(34,91,192,.09)] max-[480px]:px-2.5">
          <span className="sr-only">Filtrar por tipo</span>
          <select
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent font-bold text-zinc-800 outline-none"
            value={selectedType}
            onChange={(event) => onTypeChange(event.target.value)}
          >
            <option value="All">Todos os tipos</option>
            {availableTypes.map((type) => <option value={type} key={type}>{type}</option>)}
          </select>
          <ChevronDown className="shrink-0" size={16} aria-hidden="true" />
        </label>
      </div>
    </header>
  )
}
