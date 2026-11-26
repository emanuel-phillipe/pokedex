package com.emanuelphillipe.PokedexAPI.controller;

import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonBatchRequest;
import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonRequest;
import com.emanuelphillipe.PokedexAPI.model.Pokemon;
import com.emanuelphillipe.PokedexAPI.service.PokemonService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
@Tag(name="Pokemon")
public class PokemonController {

    private final PokemonService pokemonService;

    @Autowired
    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public ResponseEntity<List<Pokemon>> getAll() {
        return ResponseEntity.ok(pokemonService.getAll());
    }

    @PostMapping()
    public ResponseEntity<Pokemon> create(@RequestBody CreatePokemonRequest pokemonRequest){
        return ResponseEntity.ok(pokemonService.create(pokemonRequest));
    }

    @PostMapping("/create-batch")
    public ResponseEntity<List<Pokemon>> createBatch(@RequestBody CreatePokemonBatchRequest pokemonBatchRequest){
        return ResponseEntity.ok(pokemonService.createBatch(pokemonBatchRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pokemon> update(@PathVariable String id, @RequestBody CreatePokemonRequest pokemonRequest) {
        return pokemonService.update(id, pokemonRequest)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!pokemonService.delete(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
