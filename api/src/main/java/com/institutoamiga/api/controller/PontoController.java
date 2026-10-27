package com.institutoamiga.api.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.institutoamiga.api.dto.PontoDTO;
import com.institutoamiga.api.model.Ponto;
import com.institutoamiga.api.repository.PontoRepository;

@RestController
@RequestMapping("/pontos")
public class PontoController {

    private final PontoRepository repository;

    public PontoController(PontoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PontoDTO> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ponto -> ResponseEntity.ok(toDTO(ponto)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public Page<PontoDTO> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "nome") String sort) {

        if (size > 50) size = 50;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return repository.findAll(pageable).map(this::toDTO);
    }

    private PontoDTO toDTO(Ponto p) {
        return new PontoDTO(
            p.getId(),
            p.getNome(),
            p.getEndereco(),
            p.getDiasHorarios(),
            p.getRecebeDistribui(),
            p.getLatitude(),
            p.getLongitude()
        );
    }
}