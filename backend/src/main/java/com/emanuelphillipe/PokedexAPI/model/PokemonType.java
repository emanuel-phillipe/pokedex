package com.emanuelphillipe.PokedexAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Types")
public record PokemonType(
        @Id String id,
        String name
) {

    @PersistenceCreator
    public PokemonType {
    }

    public PokemonType(String name) {
        this(null, name);
    }
}
