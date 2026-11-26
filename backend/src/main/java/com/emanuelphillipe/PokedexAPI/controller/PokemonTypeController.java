package com.emanuelphillipe.PokedexAPI.controller;

import com.emanuelphillipe.PokedexAPI.dto.CreatePokemonBatchRequest;
import com.emanuelphillipe.PokedexAPI.model.PokemonType;
import com.emanuelphillipe.PokedexAPI.service.PokemonTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pokemon-type")
public class PokemonTypeController {

    private final PokemonTypeService pokemonTypeService;

    @Autowired
    public PokemonTypeController(PokemonTypeService pokemonTypeService) {
        this.pokemonTypeService = pokemonTypeService;
    }

    @GetMapping
    public ResponseEntity<List<PokemonType>> getAll() {
        return ResponseEntity.ok(pokemonTypeService.getAll());
    }

    @GetMapping("/name/:name")
    @Description("Encontra o tipo a partir do nome cadastrado.")
    public ResponseEntity<Optional<PokemonType>> getByName(@RequestParam String name){
        return ResponseEntity.ok(pokemonTypeService.getByName(name));
    }
}
