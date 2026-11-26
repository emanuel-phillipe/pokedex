package com.emanuelphillipe.PokedexAPI.repository;

import com.emanuelphillipe.PokedexAPI.model.PokemonType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;

public interface PokemonTypeRepository extends MongoRepository<PokemonType, String> {

    PokemonType findByName(String name);

    List<PokemonType> findByNameIn(Collection<String> names);
}
