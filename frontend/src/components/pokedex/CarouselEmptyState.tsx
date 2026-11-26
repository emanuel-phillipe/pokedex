interface CarouselEmptyStateProps {
  onClear: () => void
}

export function CarouselEmptyState({ onClear }: CarouselEmptyStateProps) {
  return (
    <div className="absolute inset-x-0 top-[86px] z-[5] flex flex-col items-center justify-center text-center max-[720px]:top-[132px]">
      <span
        className="grid size-[52px] place-items-center rounded-full border-2 border-zinc-400 bg-[linear-gradient(#efeff1_0_46%,#a1a1aa_46%_54%,white_54%)]"
        aria-hidden="true"
      >
        <span className="size-3.5 rounded-full border-2 border-zinc-400 bg-white" />
      </span>
      <h2 className="mt-[19px] mb-1.5 text-2xl font-bold tracking-[-.04em]">Nenhum Pokémon encontrado</h2>
      <p className="m-0 text-[13px] text-zinc-500">Tente pesquisar outro nome, ID ou tipo.</p>
      <button
        className="mt-[19px] rounded-[7px] bg-zinc-900 px-[15px] py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#225bc0]"
        onClick={onClear}
      >
        Limpar filtros
      </button>
    </div>
  )
}
