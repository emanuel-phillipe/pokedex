import type { Pokemon } from './pokemon'

interface TypeBadgesProps {
  types: Pokemon['types']
}

export function TypeBadges({ types }: TypeBadgesProps) {
  const badgeBase = 'inline-flex rounded-full px-4 py-2 text-[0.9rem] leading-none font-[850] tracking-[.08em] uppercase'

  if (!types.length) {
    return <span className={`${badgeBase} bg-zinc-100 text-zinc-600`}>Unknown</span>
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {types.map((type, index) => (
        <span
          className={`${badgeBase} ${index === 0 ? 'bg-[#225bc0] text-white' : 'bg-[#fff0f1] text-[#b81f2a]'}`}
          key={type.id}
        >
          {type.name}
        </span>
      ))}
    </div>
  )
}
