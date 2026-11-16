package com.institutoamiga.api.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.institutoamiga.api.dto.PontoRequestDTO;
import com.institutoamiga.api.dto.PontoResponseDTO;
import com.institutoamiga.api.entity.Ponto;
import com.institutoamiga.api.repository.PontoRepository;

@Service
public class PontoService {

    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public List<PontoResponseDTO> listarTodos() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<PontoResponseDTO> filtrar(String filtro, Pageable pageable) {
        return repository.filtrar(filtro, pageable).map(this::toResponse);
    }

    public PontoResponseDTO buscarPorId(UUID id) {
        return toResponse(buscarEntidade(id));
    }

    public PontoResponseDTO cadastrar(PontoRequestDTO dto) {
        Ponto ponto = new Ponto(dto.nome(), dto.endereco(), dto.bairro(), dto.horario(), dto.tipo());
        return toResponse(repository.save(ponto));
    }

    public PontoResponseDTO editar(UUID id, PontoRequestDTO dto) {
        Ponto ponto = buscarEntidade(id);
        ponto.setNome(dto.nome());
        ponto.setEndereco(dto.endereco());
        ponto.setBairro(dto.bairro());
        ponto.setHorario(dto.horario());
        ponto.setTipo(dto.tipo());
        return toResponse(repository.save(ponto));
    }

    public void excluir(UUID id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Ponto não encontrado");
        }
        repository.deleteById(id);
    }

    private Ponto buscarEntidade(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ponto não encontrado"));
    }

    private PontoResponseDTO toResponse(Ponto p) {
        return new PontoResponseDTO(p.getId(), p.getNome(), p.getEndereco(), p.getBairro(), p.getHorario(), p.getTipo());
    }
}
