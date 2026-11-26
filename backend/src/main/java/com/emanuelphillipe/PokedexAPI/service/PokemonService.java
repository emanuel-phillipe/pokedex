package com.emanuelphillipe.PokedexAPI.service;

import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonBatchRequest;
import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonRequest;
import com.emanuelphillipe.PokedexAPI.model.Pokemon;
import com.emanuelphillipe.PokedexAPI.repository.PokemonRepository;
import com.emanuelphillipe.PokedexAPI.repository.PokemonTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final PokemonTypeRepository pokemonTypeRepository;

    @Autowired
    public PokemonService(PokemonRepository pokemonRepository, PokemonTypeRepository pokemonTypeRepository) {
        this.pokemonRepository = pokemonRepository;
        this.pokemonTypeRepository = pokemonTypeRepository;
    }

    public List<Pokemon> getAll() { return pokemonRepository.findAll(); }

    public Pokemon create(CreatePokemonRequest pokemonRequest) {


        Pokemon pokemons = new Pokemon(
                pokemonRequest.Pokemon(),
                pokemonRequest.HP(),
                pokemonRequest.Attack(),
                pokemonRequest.Defense(),
                pokemonRequest.Special_Attack(),
                pokemonRequest.Special_Defense(),
                pokemonRequest.Speed(),
                pokemonTypeRepository.findByNameIn(pokemonRequest.typesName()),
                pokemonRequest.image()
        );

        return pokemonRepository.save(pokemons);
    }

    public List<Pokemon> createBatch(CreatePokemonBatchRequest pokemonBatchRequest) {

        if (pokemonBatchRequest == null || pokemonBatchRequest.pokemonRequestList() == null) {
            return Collections.emptyList();
        }

        List<Pokemon> pokemons = new ArrayList<Pokemon>();

        for(CreatePokemonRequest pokemonRequest : pokemonBatchRequest.pokemonRequestList()) {
            pokemons.add(new Pokemon(
                    pokemonRequest.Pokemon(),
                    pokemonRequest.HP(),
                    pokemonRequest.Attack(),
                    pokemonRequest.Defense(),
                    pokemonRequest.Special_Attack(),
                    pokemonRequest.Special_Defense(),
                    pokemonRequest.Speed(),
                    pokemonTypeRepository.findByNameIn(pokemonRequest.typesName()),
                    pokemonRequest.image()));
        }

        return pokemonRepository.saveAll(pokemons);
    }
}
