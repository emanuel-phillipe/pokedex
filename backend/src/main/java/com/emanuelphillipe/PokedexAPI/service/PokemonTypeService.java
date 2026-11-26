package com.emanuelphillipe.PokedexAPI.service;

import com.emanuelphillipe.PokedexAPI.model.PokemonType;
import com.emanuelphillipe.PokedexAPI.repository.PokemonTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PokemonTypeService {

    private final PokemonTypeRepository pokemonTypeRepository;

    @Autowired
    public PokemonTypeService(PokemonTypeRepository pokemonTypeRepository) {
        this.pokemonTypeRepository = pokemonTypeRepository;
    }

    public List<PokemonType> getAll() { return pokemonTypeRepository.findAll(); }

    public Optional<PokemonType> getByName(String name) {return Optional.ofNullable(pokemonTypeRepository.findByName(name)); }

    public List<PokemonType> getByNameBatch(List<String> names) {return pokemonTypeRepository.findByNameIn(names); }
}
