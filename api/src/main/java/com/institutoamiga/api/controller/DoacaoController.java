package com.institutoamiga.api.controller;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.institutoamiga.api.dto.DoacaoRequestDTO;
import com.institutoamiga.api.dto.DoacaoResponseDTO;
import com.institutoamiga.api.service.DoacaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/doacoes")
@CrossOrigin
public class DoacaoController {

    private final DoacaoService service;

    public DoacaoController(DoacaoService service) {
        this.service = service;
    }

    @GetMapping("/filtro")
    public Page<DoacaoResponseDTO> filtrar(
            @RequestParam(required = false, defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable) {
        return service.filtrar(filtro, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoacaoResponseDTO> buscarPorId(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<DoacaoResponseDTO> cadastrar(@Valid @RequestBody DoacaoRequestDTO dto) {
        DoacaoResponseDTO criada = service.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoacaoResponseDTO> editar(@PathVariable UUID id, @Valid @RequestBody DoacaoRequestDTO dto) {
        try {
            return ResponseEntity.ok(service.editar(id, dto));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable UUID id) {
        try {
            service.excluir(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
