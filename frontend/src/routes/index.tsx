import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import FlexCarousel from '#/components/FlexCarousel'
import type { FlexCarouselItem } from '#/components/FlexCarousel'
import { ActivePokemon } from '#/components/pokedex/ActivePokemon'
import { CarouselEmptyState } from '#/components/pokedex/CarouselEmptyState'
import { DetailPanel } from '#/components/pokedex/DetailPanel'
import { PokedexHeader } from '#/components/pokedex/PokedexHeader'
import { pokemonImageUrl } from '#/components/pokedex/pokemon'
import type { Pokemon } from '#/components/pokedex/pokemon'
import pokedexData from '../data/pokedex-data.json'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [activePokemon, setActivePokemon] = useState<Pokemon>(pokedexData.pokemon[0])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  const availableTypes = useMemo(
    () =>
      Array.from(
        new Set(pokedexData.pokemon.flatMap((pokemon) => pokemon.types.map((type) => type.name))),
      ).sort(),
    [],
  )

  const filteredPokemon = useMemo(() => {
    const normalized = query.trim().toLowerCase().replace(/^#/, '')
    return pokedexData.pokemon.filter((pokemon) => {
      const matchesQuery =
        !normalized ||
        pokemon.name.toLowerCase().includes(normalized) ||
        String(pokemon.id).startsWith(normalized)
      const matchesType =
        selectedType === 'All' || pokemon.types.some((type) => type.name === selectedType)
      return matchesQuery && matchesType
    })
  }, [query, selectedType])

  const carouselItems = useMemo<FlexCarouselItem[]>(
    () =>
      filteredPokemon.map((pokemon) => ({
        id: pokemon.id,
        src: pokemonImageUrl(pokemon.id),
        alt: pokemon.name,
        title: pokemon.name,
        subtitle: pokemon.types.map((type) => type.name).join(' · '),
      })),
    [filteredPokemon],
  )

  useEffect(() => {
    setSelectedPokemon(null)
    if (filteredPokemon[0]) setActivePokemon(filteredPokemon[0])
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
        totalCount={pokedexData.pokemon.length}
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

        {carouselItems.length > 0 ? (
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

        {carouselItems.length > 0 && !selectedPokemon && <ActivePokemon pokemon={activePokemon} />}
        {selectedPokemon && <DetailPanel pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
      </section>
    </main>
  )
}
