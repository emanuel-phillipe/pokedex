package com.emanuelphillipe.PokedexAPI.controller;

import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonBatchRequest;
import com.emanuelphillipe.PokedexAPI.model.Pokemon;
import com.emanuelphillipe.PokedexAPI.model.PokemonType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PokemonJsonContractTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void bindsTheBatchPayloadAndSerializesPokemonProperties() throws Exception {
        var request = objectMapper.readValue("""
                {"pokemonRequestList":[{"Pokemon":"Bulbasaur","HP":45,"Attack":49,
                "Defense":49,"Special_Attack":65,"Special_Defense":65,"Speed":45,
                "typesName":["Grass","Poison"],"image":"bulbasaur.png"}]}
                """, CreatePokemonBatchRequest.class);

        var response = objectMapper.writeValueAsString(
                new Pokemon("Bulbasaur", 45, 49, 49, 65, 65, 45,
                        java.util.List.of(new PokemonType("Grass"), new PokemonType("Poison")), "bulbasaur.png"));

        assertEquals(1, request.pokemonRequestList().size());
        assertEquals("Bulbasaur", request.pokemonRequestList().getFirst().Pokemon());
        assertEquals(java.util.List.of("Grass", "Poison"), request.pokemonRequestList().getFirst().typesName());
        assertEquals("bulbasaur.png", request.pokemonRequestList().getFirst().image());
        assertTrue(response.contains("\"Pokemon\":\"Bulbasaur\""));
        assertTrue(response.contains("\"HP\":45"));
        assertTrue(response.contains("\"types\":[{\"id\":null,\"name\":\"Grass\"}"));
        assertTrue(response.contains("\"image\":\"bulbasaur.png\""));
    }
}
