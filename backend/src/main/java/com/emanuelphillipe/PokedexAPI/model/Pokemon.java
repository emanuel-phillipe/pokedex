package com.emanuelphillipe.PokedexAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Pokemon")
public record Pokemon(
        @Id String id,
        String Pokemon,
        Integer HP,
        Integer Attack,
        Integer Defense,
        Integer Special_Attack,
        Integer Special_Defense,
        Integer Speed,
        @DBRef List<PokemonType> types,
        String image
) {

    @PersistenceCreator
    public Pokemon {
        types = types == null ? List.of() : List.copyOf(types);
    }

    public Pokemon(String Pokemon, Integer HP, Integer Attack, Integer Defense,
                   Integer Special_Attack, Integer Special_Defense, Integer Speed, List<PokemonType> types, String image) {
        this(null, Pokemon, HP, Attack, Defense, Special_Attack, Special_Defense, Speed, types, image);
    }

    public Pokemon(String Pokemon, Integer HP, Integer Attack, Integer Defense,
                   Integer Special_Attack, Integer Special_Defense, Integer Speed) {
        this(Pokemon, HP, Attack, Defense, Special_Attack, Special_Defense, Speed, List.of(), null);
    }
}
