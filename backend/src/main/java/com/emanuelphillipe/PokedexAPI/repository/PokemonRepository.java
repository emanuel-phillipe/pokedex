package com.emanuelphillipe.PokedexAPI.repository;

import com.emanuelphillipe.PokedexAPI.model.Pokemon;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PokemonRepository extends MongoRepository<Pokemon, String> {
}
