package com.emanuelphillipe.PokedexAPI.dto;

import java.util.List;

public record CreatePokemonBatchRequest(
        List<CreatePokemonRequest> pokemonRequestList
) {

}
