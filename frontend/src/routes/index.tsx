import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import FlexCarousel from '#/components/FlexCarousel'
import type { FlexCarouselItem } from '#/components/FlexCarousel'
import { ActivePokemon } from '#/components/pokedex/ActivePokemon'
import { CarouselEmptyState } from '#/components/pokedex/CarouselEmptyState'
import { DetailPanel } from '#/components/pokedex/DetailPanel'
import { PokedexHeader } from '#/components/pokedex/PokedexHeader'
import type { Pokemon } from '#/components/pokedex/pokemon'
import { fetchPokemons } from '#/lib/pokemon-api'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    setIsLoading(true)
    setError(null)

    fetchPokemons(controller.signal)
      .then((data) => {
        if (!cancelled) setPokemons(data)
      })
      .catch((requestError: unknown) => {
        if (cancelled || (requestError instanceof DOMException && requestError.name === 'AbortError')) return
        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os Pokémon.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [requestVersion])

  const availableTypes = useMemo(
    () =>
      Array.from(
        new Set(pokemons.flatMap((pokemon) => pokemon.types.map((type) => type.name))),
      ).sort(),
    [pokemons],
  )

  const filteredPokemon = useMemo(() => {
    const normalized = query.trim().toLowerCase().replace(/^#/, '')
    return pokemons.filter((pokemon) => {
      const matchesQuery =
        !normalized ||
        pokemon.name.toLowerCase().includes(normalized) ||
        String(pokemon.id).startsWith(normalized)
      const matchesType =
        selectedType === 'All' || pokemon.types.some((type) => type.name === selectedType)
      return matchesQuery && matchesType
    })
  }, [pokemons, query, selectedType])

  const carouselItems = useMemo<FlexCarouselItem[]>(
    () =>
      filteredPokemon.map((pokemon) => ({
        id: pokemon.id,
        src: pokemon.image,
        alt: pokemon.name,
        title: pokemon.name,
        subtitle: pokemon.types.map((type) => type.name).join(' · '),
      })),
    [filteredPokemon],
  )

  useEffect(() => {
    setSelectedPokemon(null)
    setActivePokemon(filteredPokemon[0] ?? null)
  }, [filteredPokemon])

  const pokemonFromItem = (item: FlexCarouselItem) =>
    filteredPokemon.find((pokemon) => pokemon.id === item.id) ?? filteredPokemon[0]

  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans text-zinc-900 antialiased">
      <PokedexHeader
        availableTypes={availableTypes}
        query={query}
        resultCount={filteredPokemon.length}
        selectedType={selectedType}
        totalCount={pokemons.length}
        onQueryChange={setQuery}
        onTypeChange={setSelectedType}
      />

      <section
        className="relative h-screen min-h-[620px] overflow-hidden bg-white pt-[86px] max-[720px]:min-h-[680px] max-[720px]:pt-[132px]"
      >
        <span
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(43vw,590px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-100 shadow-[0_0_0_74px_#fafafa,0_0_0_75px_#f1f1f3]"
          aria-hidden="true"
        />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => setRequestVersion((version) => version + 1)} />
        ) : carouselItems.length > 0 ? (
          <FlexCarousel
            className="!absolute inset-0 z-[2] !h-screen"
            items={carouselItems}
            preset="liquid"
            intro="deal"
            cardHeight={0.48}
            gap={200}
            squeeze={0.5}
            focusOnClick
            focusVisible={selectedPokemon !== null}
            fit="square"
            radius={18}
            lensWidth={0.76}
            lensHeight={1.18}
            tilt={62}
            roundness={3}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={4}
            followCursor={false}
            autoplay={false}
            captureWheel
            onChange={(_, item) => {
              const pokemon = pokemonFromItem(item)
              if (pokemon) setActivePokemon(pokemon)
            }}
            onSelect={(_, item) => {
              const pokemon = pokemonFromItem(item)
              if (pokemon) setSelectedPokemon(pokemon)
            }}
            onFocusChange={(index) => {
              if (index === null) setSelectedPokemon(null)
            }}
          />
        ) : (
          <CarouselEmptyState onClear={() => { setQuery(''); setSelectedType('All') }} />
        )}

        {carouselItems.length > 0 && !selectedPokemon && activePokemon && <ActivePokemon pokemon={activePokemon} />}
        {selectedPokemon && <DetailPanel pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
      </section>
    </main>
  )
}

function LoadingState() {
  return (
    <div className="absolute inset-0 z-[5] grid place-items-center" role="status">
      <p className="text-sm font-semibold text-zinc-500">Carregando Pokémon...</p>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm text-zinc-600">{message}</p>
      <button
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#225bc0]"
        type="button"
        onClick={onRetry}
      >
        Tentar novamente
      </button>
    </div>
  )
}
