package com.emanuelphillipe.PokedexAPI.dto;

import java.util.List;

public record CreatePokemonRequest(
        String Pokemon,
        Integer HP,
        Integer Attack,
        Integer Defense,
        Integer Special_Attack,
        Integer Special_Defense,
        Integer Speed,
        List<String> typesName,
        String image
) {

    public CreatePokemonRequest {
        typesName = typesName == null ? List.of() : List.copyOf(typesName);
    }

}
