package com.emanuelphillipe.PokedexAPI.service;

import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonBatchRequest;
import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonRequest;
import com.emanuelphillipe.PokedexAPI.model.Pokemon;
import com.emanuelphillipe.PokedexAPI.model.PokemonType;
import com.emanuelphillipe.PokedexAPI.repository.PokemonRepository;
import com.emanuelphillipe.PokedexAPI.repository.PokemonTypeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PokemonServiceTest {

    @Mock
    private PokemonRepository pokemonRepository;

    @Mock
    private PokemonTypeRepository pokemonTypeRepository;

    @InjectMocks
    private PokemonService pokemonService;

    @Test
    void createsAndPersistsEveryPokemonInTheBatchRequest() {
        var request = new CreatePokemonBatchRequest(List.of(
                new CreatePokemonRequest("Bulbasaur", 45, 49, 49, 65, 65, 45, List.of("Grass", "Poison"), "bulbasaur.png"),
                new CreatePokemonRequest("Ivysaur", 60, 62, 63, 80, 80, 60, List.of("Grass", "Poison"), "ivysaur.png")
        ));
        var types = List.of(new PokemonType("Grass"), new PokemonType("Poison"));
        when(pokemonTypeRepository.findByNameIn(List.of("Grass", "Poison"))).thenReturn(types);
        when(pokemonRepository.saveAll(anyList())).thenAnswer(invocation -> invocation.getArgument(0));

        var savedPokemons = pokemonService.createBatch(request);

        assertEquals(List.of("Bulbasaur", "Ivysaur"), savedPokemons.stream().map(Pokemon::Pokemon).toList());

        verify(pokemonRepository).saveAll(List.of(
                new Pokemon("Bulbasaur", 45, 49, 49, 65, 65, 45, types, "bulbasaur.png"),
                new Pokemon("Ivysaur", 60, 62, 63, 80, 80, 60, types, "ivysaur.png")
        ));
    }

    @Test
    void returnsAllPokemonsLoadedFromTheRepository() {
        var persistedPokemons = List.of(new Pokemon("Pikachu", 35, 55, 40, 50, 50, 90));
        when(pokemonRepository.findAll()).thenReturn(persistedPokemons);

        assertEquals(persistedPokemons, pokemonService.getAll());
    }

    @Test
    void updatesAnExistingPokemonAndKeepsItsId() {
        var request = new CreatePokemonRequest("Raichu", 60, 90, 55, 90, 80, 110,
                List.of("Electric"), "raichu.png");
        var types = List.of(new PokemonType("Electric"));
        var expectedPokemon = new Pokemon("pokemon-25", "Raichu", 60, 90, 55, 90, 80, 110,
                types, "raichu.png");
        when(pokemonRepository.existsById("pokemon-25")).thenReturn(true);
        when(pokemonTypeRepository.findByNameIn(List.of("Electric"))).thenReturn(types);
        when(pokemonRepository.save(expectedPokemon)).thenReturn(expectedPokemon);

        var updatedPokemon = pokemonService.update("pokemon-25", request);

        assertEquals(expectedPokemon, updatedPokemon.orElseThrow());
        verify(pokemonRepository).save(expectedPokemon);
    }

    @Test
    void doesNotUpdatePokemonThatDoesNotExist() {
        when(pokemonRepository.existsById("missing")).thenReturn(false);

        var updatedPokemon = pokemonService.update("missing", new CreatePokemonRequest(
                "Raichu", 60, 90, 55, 90, 80, 110, List.of(), null));

        assertEquals(java.util.Optional.empty(), updatedPokemon);
        verify(pokemonRepository, never()).save(org.mockito.ArgumentMatchers.any(Pokemon.class));
    }

    @Test
    void deletesAnExistingPokemon() {
        when(pokemonRepository.existsById("pokemon-25")).thenReturn(true);

        assertEquals(true, pokemonService.delete("pokemon-25"));

        verify(pokemonRepository).deleteById("pokemon-25");
    }

    @Test
    void doesNotDeletePokemonThatDoesNotExist() {
        when(pokemonRepository.existsById("missing")).thenReturn(false);

        assertEquals(false, pokemonService.delete("missing"));
        verify(pokemonRepository, never()).deleteById("missing");
    }
}
